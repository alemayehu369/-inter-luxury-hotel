import { NextResponse } from "next/server";
import { readDB, writeDB, genId } from "@/lib/db";

export async function GET() {
  const db = readDB();
  return NextResponse.json({ menu: db.menu });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { name, category, price, image, description } = body;

  if (!name || !category || !price) {
    return NextResponse.json(
      { error: "Name, category and price are required." },
      { status: 400 }
    );
  }

  const db = readDB();
  const item = {
    id: genId("m"),
    name,
    category,
    price: Number(price),
    image:
      image ||
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    description: description || "",
    createdAt: new Date().toISOString(),
  };
  db.menu.unshift(item);
  writeDB(db);

  return NextResponse.json({ item }, { status: 201 });
}
