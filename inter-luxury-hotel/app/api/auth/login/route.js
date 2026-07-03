import { NextResponse } from "next/server";
import { readDB, publicUser } from "@/lib/db";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const db = readDB();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  if (user.status === "suspended") {
    return NextResponse.json(
      { error: "This account has been suspended. Contact the front desk." },
      { status: 403 }
    );
  }

  return NextResponse.json({ user: publicUser(user) });
}
