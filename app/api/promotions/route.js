import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// GET /api/promotions - Get active promotions
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const promotions = await prisma.promotion.findMany({
      where: {
        isActive: true,
        startDate: { lte: today },
        endDate: { gte: today },
      },
      orderBy: {
        discountValue: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: promotions,
      count: promotions.length,
    });
  } catch (error) {
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch promotions',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
