import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// GET /api/provinces - Get all provinces
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('regionId');
    const regionSlug = searchParams.get('regionSlug');

    const where = {};

    if (regionId) {
      where.regionId = parseInt(regionId);
    }

    if (regionSlug) {
      where.region = {
        slug: regionSlug,
      };
    }

    const provinces = await prisma.province.findMany({
      where,
      include: {
        region: true,
        _count: {
          select: { accommodations: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: provinces,
      count: provinces.length,
    });
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch provinces',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
