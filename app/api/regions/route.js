import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// GET /api/regions - Get all regions with accommodation count
export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      include: {
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
      data: regions,
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch regions',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/regions - Create new region (Admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, slug, description, imageUrl } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and slug are required',
        },
        { status: 400 }
      );
    }

    const region = await prisma.region.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Region created successfully',
        data: region,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating region:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create region',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
