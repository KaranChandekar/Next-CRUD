import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();

  try {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const status = formData.get("status")?.toString();
    const dueDateRaw = formData.get("dueDate");
    const isValidDate = (d: Date) => d instanceof Date && !isNaN(d.getTime());
    const dueDate =
      dueDateRaw && typeof dueDateRaw === "string" && dueDateRaw !== ""
        ? new Date(dueDateRaw)
        : undefined;
    const priority = formData.get("priority")?.toString();

    if (!title || !status || !priority) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    let finalDueDate: Date | undefined = undefined;
    if (dueDate !== undefined) {
      finalDueDate = isValidDate(dueDate) ? dueDate : undefined;
    }
    console.log({
      title,
      description,
      status,
      completed: false,
      dueDate: finalDueDate,
      priority,
    });
    // Add this data in postgres database
    const task = await prisma.task.create({
      data: {
        title,
        description: description || undefined,
        status,
        completed: false,
        dueDate: finalDueDate,
        priority,
      },
    });
    return new Response(JSON.stringify(task), {
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
