import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = [
      {
        id: 1,
        title: "Web Design",
        description: "Modern and responsive website design tailored to business goals."
      },
      {
        id: 2,
        title: "Front-End Development",
        description: "High-performance user interfaces built with modern web technologies."
      },
      {
        id: 3,
        title: "Branding",
        description: "Brand identity systems that help businesses stand out and grow."
      }
    ];

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
