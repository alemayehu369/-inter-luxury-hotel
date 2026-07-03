import { NextResponse } from "next/server";
import { readDB, writeDB, genId } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const db = readDB();
  let orders = db.orders;
  if (userId) orders = orders.filter((o) => o.userId === userId);
  orders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return NextResponse.json({ orders });
}

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { userId, customerName, tableRoom, items } = body;

  if (!customerName || !tableRoom || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Customer name, table/room number, and at least one item are required." },
      { status: 400 }
    );
  }

  const db = readDB();

  // Re-derive prices from the current menu so totals can't be tampered with.
  const lineItems = items.map((it) => {
    const menuItem = db.menu.find((m) => m.id === it.menuId);
    return {
      menuId: it.menuId,
      name: menuItem ? menuItem.name : it.name || "Item",
      price: menuItem ? menuItem.price : Number(it.price) || 0,
      qty: Number(it.qty) || 1,
    };
  });

  const total = lineItems.reduce((sum, it) => sum + it.price * it.qty, 0);

  const order = {
    id: genId("ord"),
    userId: userId || null,
    customerName,
    tableRoom,
    items: lineItems,
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.orders.unshift(order);
  writeDB(db);

  return NextResponse.json({ order }, { status: 201 });
}
