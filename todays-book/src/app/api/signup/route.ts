import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '이미 계정이 있습니다.' }, { status: 500 });
  }
}
