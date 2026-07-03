import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  const idx = db.rooms.findIndex((r) => r.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }
  db.rooms[idx] = {
    ...db.rooms[idx],
    ...body,
    id,
    price: body.price !== undefined ? Number(body.price) : db.rooms[idx].price,
  };
  writeDB(db);
  return NextResponse.json({ room: db.rooms[idx] });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const db = readDB();
  const before = db.rooms.length;
  db.rooms = db.rooms.filter((r) => r.id !== id);
  if (db.rooms.length === before) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }
  writeDB(db);
  return NextResponse.json({ ok: true });
}
