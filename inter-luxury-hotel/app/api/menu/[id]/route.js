import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  const idx = db.menu.findIndex((m) => m.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }
  db.menu[idx] = {
    ...db.menu[idx],
    ...body,
    id,
    price: body.price !== undefined ? Number(body.price) : db.menu[idx].price,
  };
  writeDB(db);
  return NextResponse.json({ item: db.menu[idx] });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const db = readDB();
  const before = db.menu.length;
  db.menu = db.menu.filter((m) => m.id !== id);
  if (db.menu.length === before) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }
  writeDB(db);
  return NextResponse.json({ ok: true });
}
