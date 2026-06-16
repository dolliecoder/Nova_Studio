import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the httpOnly admin_session cookie by setting maxAge to 0
    response.cookies.set({
      name: "admin_session",
      value: "",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/logout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
