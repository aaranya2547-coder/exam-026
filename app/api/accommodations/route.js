import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// GET /api/accommodations - Get all accommodations with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionId = searchParams.get('regionId');
    const regionSlug = searchParams.get('regionSlug');
    const provinceId = searchParams.get('provinceId');
    const provinceSlug = searchParams.get('provinceSlug');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const where = {
      isAvailable: true,
    };

    if (regionId) {
      where.regionId = parseInt(regionId);
    }

    if (regionSlug) {
      where.region = {
        slug: regionSlug,
      };
    }

    if (provinceId) {
      where.provinceId = parseInt(provinceId);
    }

    if (provinceSlug) {
      where.province = {
        slug: provinceSlug,
      };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDesc: { contains: search } },
      ];
    }

    const accommodations = await prisma.accommodation.findMany({
      where,
      include: {
        region: true,
        province: true,
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse JSON fields
    const parsedAccommodations = accommodations.map((acc) => ({
      ...acc,
      images: acc.images ? JSON.parse(acc.images) : [],
      amenities: acc.amenities ? JSON.parse(acc.amenities) : [],
    }));

    return NextResponse.json({
      success: true,
      data: parsedAccommodations,
      count: parsedAccommodations.length,
    });
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch accommodations',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/accommodations - Create new accommodation (Admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDesc,
      regionId,
      pricePerNight,
      maxGuests,
      address,
      latitude,
      longitude,
      amenities,
      images,
    } = body;

    if (!name || !slug || !description || !shortDesc || !regionId || !pricePerNight || !maxGuests || !address) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const accommodation = await prisma.accommodation.create({
      data: {
        name,
        slug,
        description,
        shortDesc,
        regionId,
        pricePerNight,
        maxGuests,
        address,
        latitude,
        longitude,
        amenities: amenities ? JSON.stringify(amenities) : null,
        images: images ? JSON.stringify(images) : null,
      },
      include: {
        region: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Accommodation created successfully',
        data: {
          ...accommodation,
          images: accommodation.images ? JSON.parse(accommodation.images) : [],
          amenities: accommodation.amenities ? JSON.parse(accommodation.amenities) : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating accommodation:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create accommodation',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
