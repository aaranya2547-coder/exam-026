import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// Helper function to generate booking number
function generateBookingNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `BK${timestamp}${random}`;
}

// Helper function to calculate nights
function calculateNights(checkIn, checkOut) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Helper function to calculate months difference
function getMonthsDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  const days = d2.getDate() - d1.getDate();
  return days >= 0 ? months : months - 1;
}

// GET /api/bookings - Get all bookings
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    const where = {};

    if (email) {
      where.customer = {
        email,
      };
    }

    if (status) {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        accommodation: {
          include: {
            region: true,
          },
        },
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse accommodation images
    const parsedBookings = bookings.map((booking) => ({
      ...booking,
      accommodation: {
        ...booking.accommodation,
        images: booking.accommodation.images ? JSON.parse(booking.accommodation.images) : [],
        amenities: booking.accommodation.amenities ? JSON.parse(booking.accommodation.amenities) : [],
      },
    }));

    return NextResponse.json({
      success: true,
      data: parsedBookings,
      count: parsedBookings.length,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch bookings',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create new booking
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      accommodationId,
      customerData,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
    } = body;

    // Validate required fields
    if (!accommodationId || !customerData || !checkInDate || !checkOutDate || !numberOfGuests) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkOut <= checkIn) {
      return NextResponse.json(
        {
          success: false,
          message: 'Check-out date must be after check-in date',
        },
        { status: 400 }
      );
    }

    // Check 2-month advance booking requirement
    const monthsDiff = getMonthsDifference(today, checkIn);
    if (monthsDiff < 2) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking must be made at least 2 months in advance',
        },
        { status: 400 }
      );
    }

    // Check if accommodation exists and is available
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId },
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

    if (!accommodation.isAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: 'Accommodation is not available',
        },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        accommodationId,
        status: { not: 'cancelled' },
        OR: [
          {
            AND: [
              { checkInDate: { lte: checkIn } },
              { checkOutDate: { gt: checkIn } },
            ],
          },
          {
            AND: [
              { checkInDate: { lt: checkOut } },
              { checkOutDate: { gte: checkOut } },
            ],
          },
          {
            AND: [
              { checkInDate: { gte: checkIn } },
              { checkOutDate: { lte: checkOut } },
            ],
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Accommodation is already booked for the selected dates',
        },
        { status: 400 }
      );
    }

    // Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { email: customerData.email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          fullName: customerData.fullName,
          email: customerData.email,
          phone: customerData.phone,
        },
      });
    } else {
      customer = await prisma.customer.update({
        where: { email: customerData.email },
        data: {
          fullName: customerData.fullName,
          phone: customerData.phone,
        },
      });
    }

    // Calculate nights and total price
    const numberOfNights = calculateNights(checkIn, checkOut);
    const totalPrice = accommodation.pricePerNight * numberOfNights;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        accommodationId,
        customerId: customer.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        numberOfGuests,
        numberOfNights,
        totalPrice,
        specialRequests: specialRequests || null,
        status: 'confirmed',
      },
      include: {
        accommodation: {
          include: {
            region: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: {
          ...booking,
          accommodation: {
            ...booking.accommodation,
            images: booking.accommodation.images ? JSON.parse(booking.accommodation.images) : [],
            amenities: booking.accommodation.amenities ? JSON.parse(booking.accommodation.amenities) : [],
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create booking',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
