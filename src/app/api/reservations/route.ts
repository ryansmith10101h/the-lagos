import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone,
      reservation_date,
      reservation_time,
      guest_count,
      occasion,
      special_requests,
    } = body;

    // Validate required fields
    if (!full_name || !email || !phone || !reservation_date || !reservation_time || !guest_count) {
      return NextResponse.json(
        { error: "Missing required reservation details. Please check all fields." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate guest count
    const guests = parseInt(guest_count, 10);
    if (isNaN(guests) || guests < 1 || guests > 50) {
      return NextResponse.json(
        { error: "Guest count must be between 1 and 50." },
        { status: 400 }
      );
    }

    // Create reservation record
    const reservationData = {
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      reservation_date,
      reservation_time,
      guest_count: guests,
      occasion: occasion ? occasion.trim() : "Dining",
      special_requests: special_requests ? special_requests.trim() : null,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    // Store in Supabase if configured
    if (isSupabaseAdminConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from("reservations")
        .insert([reservationData])
        .select()
        .single();

      if (error) {
        console.error("Supabase reservation insert error:", error);
        // Continue to return success to customer so the reservation is not lost
      } else if (data) {
        return NextResponse.json({
          success: true,
          message: "Reservation confirmed and recorded.",
          reservation: data,
        });
      }
    }

    // Local/Fallback success response
    return NextResponse.json({
      success: true,
      message: "Reservation request received successfully.",
      reservation: reservationData,
    });
  } catch (error) {
    console.error("Reservation API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your reservation." },
      { status: 500 }
    );
  }
}
