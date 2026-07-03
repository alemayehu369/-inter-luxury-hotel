import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  const idx = db.bookings.findIndex((b) => b.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  db.bookings[idx] = { ...db.bookings[idx], ...body, id };
  writeDB(db);
  return NextResponse.json({ booking: db.bookings[idx] });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const db = readDB();
  const before = db.bookings.length;
  db.bookings = db.bookings.filter((b) => b.id !== id);
  if (db.bookings.length === before) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  writeDB(db);
  return NextResponse.json({ ok: true });
}
