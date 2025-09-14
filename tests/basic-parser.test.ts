import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import * as fs from "fs";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH,undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH,undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform(t => ({ name: t[0], age: t[1] as number }));

type Person = { name: string; age: number };

test("parseCSV with undefined schema returns string[][] (fallback)", async () => {
  const results = (await parseCSV(PEOPLE_CSV_PATH, undefined)) as string[][];
  expect(Array.isArray(results)).toBe(true);
  expect(Array.isArray(results[0])).toBe(true);
  expect(results[0]).toEqual(["name", "age"]);
});


test("parseCSVTo with schema throws on invalid row (non-numeric age)", async () => {
  await expect(
    parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  ).rejects.toThrow(/row 3/i);
});

test("parseCSV with permissive schema returns typed objects and skips header", async () => {
  const LooseRowSchema = z
    .tuple([z.string(), z.string()])
    .transform((t) => ({ name: t[0], age: t[1] }));
  const results = (await parseCSV(PEOPLE_CSV_PATH, LooseRowSchema)) as {
    name: string;
    age: string;
  }[];
  expect(results).toHaveLength(4);
  expect(results[0]).toEqual({ name: "Alice", age: "23" });
  expect(results[1]).toEqual({ name: "Bob", age: "thirty" });
});

test("parseCSV with schema rejects when CSV shape doesn't match schema", async () => {
  const ThreeColSchema = z
    .tuple([z.string(), z.string(), z.coerce.number()])
    .transform(t => ({ first: t[0], second: t[1], age: t[2] }));

  await expect(parseCSV(PEOPLE_CSV_PATH, ThreeColSchema)).rejects.toThrow(/row/i);
});


