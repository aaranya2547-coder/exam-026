import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma-client';

// Helper function to calculate months difference
function getMonthsDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  const days = d2.getDate() - d1.getDate();
  return days >= 0 ? months : months - 1;
}

// GET /api/bookings/[id] - Get booking by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        accommodation: {
          include: {
            region: true,
          },
        },
        customer: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...booking,
        accommodation: {
          ...booking.accommodation,
          images: booking.accommodation.images ? JSON.parse(booking.accommodation.images) : [],
          amenities: booking.accommodation.amenities ? JSON.parse(booking.accommodation.amenities) : [],
        },
      },
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch booking',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Cancel booking
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: 'Booking not found',
        },
        { status: 404 }
      );
    }

    // Check if cancellation is allowed (2 months before check-in)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthsDiff = getMonthsDifference(today, booking.checkInDate);

    if (monthsDiff < 2) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cancellation is only allowed more than 2 months before check-in date',
        },
        { status: 400 }
      );
    }

    // Cancel booking
    const cancelledBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status: 'cancelled' },
      include: {
        accommodation: {
          include: {
            region: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: {
        ...cancelledBooking,
        accommodation: {
          ...cancelledBooking.accommodation,
          images: cancelledBooking.accommodation.images ? JSON.parse(cancelledBooking.accommodation.images) : [],
          amenities: cancelledBooking.accommodation.amenities ? JSON.parse(cancelledBooking.accommodation.amenities) : [],
        },
      },
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to cancel booking',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
