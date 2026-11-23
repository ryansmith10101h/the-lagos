import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    const messageData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      subject: subject ? subject.trim() : "General Inquiry",
      message: message.trim(),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseAdminConfigured && supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from("contact_messages")
        .insert([messageData]);

      if (error) {
        console.error("Supabase contact message error:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Our concierge will contact you shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
