import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Please sign in to join this event." }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id;
    const userEmail = session.user.email;

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.participants?.includes(userId) || event.participants?.includes(userEmail)) {
      return NextResponse.json({ message: "You have already joined this initiative!" }, { status: 200 });
    }

    event.participants = event.participants || [];
    event.participants.push(userId);
    await event.save();

    return NextResponse.json({ message: "Successfully joined this event!" }, { status: 200 });
  } catch (error) {
    console.error("Join Event Error:", error);
    return NextResponse.json({ error: "Failed to join event" }, { status: 500 });
  }
}