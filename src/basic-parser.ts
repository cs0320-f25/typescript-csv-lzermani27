import * as fs from "fs";
import * as readline from "readline";
import type { ZodType } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(
  path: string,
  schema: ZodType<T> | undefined
): Promise<string[][] | T[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const result: string[][] = [];

  for await (const line of rl) {
    const values = line.split(",").map((v) => v.trim());
    result.push(values);
  }

  if (!schema) return result;

  const out: T[] = [];
  for (let i = 1; i < result.length; i++) {
    const r = result[i];
    const parsed = schema.safeParse(r);
    if (!parsed.success) {
      throw new Error(
        `CSV validation failed at row ${i + 1}: ${parsed.error.message}`
      );
    }
    out.push(parsed.data);
  }
  return out;
}
