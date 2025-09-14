import { parseCSV } from "./basic-parser";
import * as path from "path";
import { z } from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = path.join(__dirname, "../data/people.csv"); // update with your actual file name

type Person = { name: string; age: number };

export const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform((tup) => ({ name: tup[0], age: tup[1] as number }));

async function main() {
  const results = await parseCSV(DATA_FILE, undefined);

  for (const record of results) console.log(record);
  for (const record in results) console.log(record);
}

main();
