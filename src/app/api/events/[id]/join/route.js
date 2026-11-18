export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: await headers() });
    const { id } = await params;
    
    let body = {};
    try {
      body = await req.json();
    } catch (e) {}

    const userEmail = body.email || session?.user?.email || session?.user?.id;

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $addToSet: { participants: userEmail } },
      { new: true }
    );

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("Join Event Error:", error);
    return NextResponse.json({ error: "Failed to join event" }, { status: 500 });
  }
}