import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";

async function main() {
  await connectToDatabase();

  const defaults = [
    {
      slug: "classic",
      title: "Classic",
      isPaid: false,
      schemaJSON: { layout: "one-column" },
    },
    {
      slug: "modern",
      title: "Modern",
      isPaid: false,
      schemaJSON: { layout: "two-column" },
    },
    {
      slug: "creative",
      title: "Creative",
      isPaid: true,
      price: 9,
      schemaJSON: { layout: "creative" },
    },
  ];

  for (const t of defaults) {
    await Template.updateOne(
      { slug: t.slug },
      { $setOnInsert: t },
      { upsert: true },
    );
  }

  console.log("Seed completed.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
