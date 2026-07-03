import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

export async function GET() {
  const db = readDB();
  return NextResponse.json({ settings: db.settings });
}

export async function PUT(req) {
  const body = await req.json().catch(() => ({}));
  const db = readDB();
  db.settings = { ...db.settings, ...body };
  writeDB(db);
  return NextResponse.json({ settings: db.settings });
}
