import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// GET /api/accommodations/[slug] - Get accommodation by slug
export async function GET(_request, { params }) {
  try {
    const { slug } = await params;

    const accommodation = await prisma.accommodation.findUnique({
      where: { slug },
      include: {
        region: true,
        bookings: {
          where: {
            status: { not: 'cancelled' },
            checkOutDate: { gte: new Date() },
          },
          select: {
            checkInDate: true,
            checkOutDate: true,
          },
        },
      },
    });

    if (!accommodation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Accommodation not found',
        },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const parsedAccommodation = {
      ...accommodation,
      images: accommodation.images ? JSON.parse(accommodation.images) : [],
      amenities: accommodation.amenities ? JSON.parse(accommodation.amenities) : [],
    };

    return NextResponse.json({
      success: true,
      data: parsedAccommodation,
    });
  } catch (error) {
    console.error('Error fetching accommodation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch accommodation',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT /api/accommodations/[slug] - Update accommodation (Admin only)
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const updateData = { ...body };

    // Convert arrays to JSON strings
    if (updateData.amenities) {
      updateData.amenities = JSON.stringify(updateData.amenities);
    }
    if (updateData.images) {
      updateData.images = JSON.stringify(updateData.images);
    }

    const accommodation = await prisma.accommodation.update({
      where: { slug },
      data: updateData,
      include: {
        region: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Accommodation updated successfully',
      data: {
        ...accommodation,
        images: accommodation.images ? JSON.parse(accommodation.images) : [],
        amenities: accommodation.amenities ? JSON.parse(accommodation.amenities) : [],
      },
    });
  } catch (error) {
    console.error('Error updating accommodation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update accommodation',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/accommodations/[slug] - Delete accommodation (Admin only)
export async function DELETE(_request, { params }) {
  try {
    const { slug } = await params;

    await prisma.accommodation.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Accommodation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete accommodation',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
