import { NextResponse } from "next/server";
import { readDB, writeDB, publicUser } from "@/lib/db";

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  const idx = db.users.findIndex((u) => u.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  const { password, ...safeBody } = body;
  db.users[idx] = { ...db.users[idx], ...safeBody, id };
  writeDB(db);
  return NextResponse.json({ user: publicUser(db.users[idx]) });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const db = readDB();
  const before = db.users.length;
  db.users = db.users.filter((u) => u.id !== id);
  if (db.users.length === before) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  writeDB(db);
  return NextResponse.json({ ok: true });
}
