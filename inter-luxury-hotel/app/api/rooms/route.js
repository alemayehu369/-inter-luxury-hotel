import { NextResponse } from "next/server";
import { readDB, writeDB, genId } from "@/lib/db";

export async function GET() {
  const db = readDB();
  return NextResponse.json({ rooms: db.rooms });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { name, type, price, image, description, available } = body;

  if (!name || !type || !price) {
    return NextResponse.json(
      { error: "Name, type and price are required." },
      { status: 400 }
    );
  }

  const db = readDB();
  const room = {
    id: genId("r"),
    name,
    type,
    price: Number(price),
    image:
      image ||
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop",
    description: description || "",
    available: available !== undefined ? !!available : true,
    createdAt: new Date().toISOString(),
  };
  db.rooms.unshift(room);
  writeDB(db);

  return NextResponse.json({ room }, { status: 201 });
}
