import { NextResponse } from "next/server";
import { readDB, writeDB, genId, publicUser } from "@/lib/db";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { name, phone, email, password, idType, idNumber } = body;

  if (!name || !phone || !email || !password || !idNumber) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  const db = readDB();
  const exists = db.users.some(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (exists) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const user = {
    id: genId("u"),
    name,
    phone,
    email,
    password,
    idType: idType || "National ID",
    idNumber,
    role: "user",
    status: "active",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDB(db);

  return NextResponse.json({ user: publicUser(user) }, { status: 201 });
}
