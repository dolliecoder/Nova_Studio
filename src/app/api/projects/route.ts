import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin session
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "true") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category, description, imageUrl } = body;

    // Validation
    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return NextResponse.json(
        { error: "Category is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return NextResponse.json(
        { error: "Description is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
      return NextResponse.json(
        { error: "Image URL is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
