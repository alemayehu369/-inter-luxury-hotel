import { NextResponse } from "next/server";
import { readDB, writeDB, genId } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const db = readDB();
  let bookings = db.bookings;
  if (userId) bookings = bookings.filter((b) => b.userId === userId);
  bookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return NextResponse.json({ bookings });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const {
    userId,
    guestName,
    phone,
    roomId,
    checkIn,
    checkOut,
    guests,
    idType,
    idNumber,
  } = body;

  if (!guestName || !phone || !roomId || !checkIn || !checkOut || !idNumber) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const nights = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));

  if (!(nights > 0)) {
    return NextResponse.json(
      { error: "Check-out must be after check-in." },
      { status: 400 }
    );
  }

  const db = readDB();
  const room = db.rooms.find((r) => r.id === roomId);
  if (!room) {
    return NextResponse.json({ error: "Room not found." }, { status: 404 });
  }
  if (!room.available) {
    return NextResponse.json(
      { error: "This room is currently unavailable." },
      { status: 409 }
    );
  }

  const total = nights * room.price;

  const booking = {
    id: genId("bk"),
    userId: userId || null,
    guestName,
    phone,
    roomId,
    roomName: room.name,
    checkIn,
    checkOut,
    nights,
    guests: Number(guests) || 1,
    idType: idType || "National ID",
    idNumber,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.bookings.unshift(booking);
  writeDB(db);

  return NextResponse.json({ booking }, { status: 201 });
}
