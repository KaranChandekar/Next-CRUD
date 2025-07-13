import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get tasks from the database
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(tasks), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
