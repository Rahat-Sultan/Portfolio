import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  validateContactForm,
  type ContactFormData,
} from "@/lib/validations/contact";

export async function POST(request: Request) {
  let body: ContactFormData;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — bots fill hidden fields; silently accept to avoid tipping them off.
  if (body.website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const errors = validateContactForm(body);
  const errorMessages = Object.values(errors);

  if (errorMessages.length > 0) {
    return NextResponse.json(
      { error: errorMessages[0], errors },
      { status: 400 },
    );
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured yet. Please set up Supabase environment variables.",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("messages").insert({
      name: body.name.trim(),
      email: body.email.trim(),
      company: body.company.trim() || null,
      message: body.message.trim(),
    });

    if (error) {
      console.error("Failed to save contact message:", error.message);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
