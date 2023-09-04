import { getAuthSession } from "@/lib/nextAuth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return redirect("/");
    }
    const { gameId, timeEnded } = await req.json();

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return NextResponse.json(
        {
          error: "Game not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded,
      },
    });

    return NextResponse.json({
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  }
}
