import { NextResponse } from "next/server";
import { readDB, publicUser } from "@/lib/db";

export async function GET() {
  const db = readDB();
  return NextResponse.json({ users: db.users.map(publicUser) });
}
