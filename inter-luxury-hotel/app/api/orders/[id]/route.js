import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  const idx = db.orders.findIndex((o) => o.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  db.orders[idx] = { ...db.orders[idx], ...body, id };
  writeDB(db);
  return NextResponse.json({ order: db.orders[idx] });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const db = readDB();
  const before = db.orders.length;
  db.orders = db.orders.filter((o) => o.id !== id);
  if (db.orders.length === before) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  writeDB(db);
  return NextResponse.json({ ok: true });
}
