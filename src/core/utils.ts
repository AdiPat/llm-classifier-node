import fs from "fs";
import csv from "csv-parser";
import { RowItem } from "../models";
import { randomUUID } from "crypto";

export function autogenerateId(): string {
  return randomUUID();
}

export async function readCSV(filePath: string): Promise<RowItem[]> {
  // check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`readCSV: File not found: ${filePath}`);
  }

  return new Promise((resolve, reject) => {
    const results: RowItem[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

export function extractClasses(
  dataset: RowItem[],
  targetColumn: string
): string[] {
  const classes = new Set<string>();

  for (const row of dataset) {
    if (targetColumn in row) {
      classes.add(row[targetColumn]);
    }
  }

  return Array.from(classes);
}
