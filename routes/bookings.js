const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

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

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
  try {
    const { status, customerId, roomId } = req.query;

    const where = {};
    if (status) where.status = status;
    if (customerId) where.customerId = parseInt(customerId);
    if (roomId) where.roomId = parseInt(roomId);

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        room: true,
        customer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        room: true,
        customer: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message,
    });
  }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    const {
      roomId,
      customerData,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!roomId || !customerData || !checkInDate || !checkOutDate || !numberOfGuests) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: 'Check-out date must be after check-in date',
      });
    }

    // Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    if (!room.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available',
      });
    }

    // Check for overlapping bookings
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        roomId,
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
      return res.status(400).json({
        success: false,
        message: 'Room is already booked for the selected dates',
      });
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
      // Update customer info if changed
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
    const totalPrice = room.pricePerNight * numberOfNights;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: generateBookingNumber(),
        roomId,
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
        room: true,
        customer: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
});

// PUT /api/bookings/:id - Update booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
      status,
    } = req.body;

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: { room: true },
    });

    if (!existingBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    const updateData = {};

    // Update dates if provided
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      if (checkOut <= checkIn) {
        return res.status(400).json({
          success: false,
          message: 'Check-out date must be after check-in date',
        });
      }

      // Check for overlapping bookings (excluding current booking)
      const overlappingBookings = await prisma.booking.findMany({
        where: {
          id: { not: parseInt(id) },
          roomId: existingBooking.roomId,
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
        return res.status(400).json({
          success: false,
          message: 'Room is already booked for the selected dates',
        });
      }

      const numberOfNights = calculateNights(checkIn, checkOut);
      const totalPrice = existingBooking.room.pricePerNight * numberOfNights;

      updateData.checkInDate = checkIn;
      updateData.checkOutDate = checkOut;
      updateData.numberOfNights = numberOfNights;
      updateData.totalPrice = totalPrice;
    }

    if (numberOfGuests !== undefined) {
      updateData.numberOfGuests = numberOfGuests;
    }

    if (specialRequests !== undefined) {
      updateData.specialRequests = specialRequests;
    }

    if (status !== undefined) {
      const validStatuses = ['confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value',
        });
      }
      updateData.status = status;
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        room: true,
        customer: true,
      },
    });

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message,
    });
  }
});

// DELETE /api/bookings/:id - Delete booking (soft delete by setting status to cancelled)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { permanent } = req.query;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (permanent === 'true') {
      // Permanent delete
      await prisma.booking.delete({
        where: { id: parseInt(id) },
      });

      res.json({
        success: true,
        message: 'Booking permanently deleted',
      });
    } else {
      // Soft delete - set status to cancelled
      const cancelledBooking = await prisma.booking.update({
        where: { id: parseInt(id) },
        data: { status: 'cancelled' },
        include: {
          room: true,
          customer: true,
        },
      });

      res.json({
        success: true,
        message: 'Booking cancelled successfully',
        data: cancelledBooking,
      });
    }
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message,
    });
  }
});

module.exports = router;
