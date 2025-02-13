/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const prisma = new PrismaClient();

const GUTENBERG_BOOK_METADATA_CSV_PATH = "./seeds/gutenberg_metadata.csv";
async function main() {
  const csvRows: Array<Record<string, unknown>> = await new Promise<
    Array<Record<string, unknown>>
  >((resolve, reject) => {
    const rows: Array<Record<string, unknown>> = [];
    fs.createReadStream(
      path.resolve(__dirname, GUTENBERG_BOOK_METADATA_CSV_PATH)
    )
      .pipe(csv.parse({ headers: true }))
      .on("data", (row: Record<string, unknown>) =>
        rows.push({
          ...row,
          gutenbergBookId: parseInt(row.gutenbergBookId as string),
        })
      )
      .on("error", reject)
      .on("end", () => resolve(rows));
  });

  await prisma.gutenbergBookMetadata.createMany({
    data: csvRows,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
