import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ date: 1 });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await req.json();

    const newEvent = await Event.create({
      title: body.title,
      description: body.description,
      category: body.category,
      location: body.location,
      date: body.date,
      thumbnail: body.thumbnail || "",
      organizerEmail: body.organizerEmail || session?.user?.email || "",
      creatorId: session?.user?.id || body.creatorId || "",
      participants: [],
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Create Event Error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}