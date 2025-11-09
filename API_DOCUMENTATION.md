# Hotel Booking API Documentation

## Base URL
```
http://localhost:3001
```

## Endpoints

### 1. Get All Bookings
**GET** `/api/bookings`

Get all bookings with optional filters.

**Query Parameters:**
- `status` (optional): Filter by status (`confirmed`, `cancelled`, `completed`)
- `customerId` (optional): Filter by customer ID
- `roomId` (optional): Filter by room ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bookingNumber": "BK1729012345678",
      "roomId": 1,
      "customerId": 1,
      "checkInDate": "2024-11-01",
      "checkOutDate": "2024-11-03",
      "numberOfGuests": 2,
      "numberOfNights": 2,
      "totalPrice": 4000.00,
      "status": "confirmed",
      "specialRequests": null,
      "createdAt": "2024-10-15T12:00:00.000Z",
      "updatedAt": "2024-10-15T12:00:00.000Z",
      "room": { ... },
      "customer": { ... }
    }
  ],
  "count": 1
}
```

---

### 2. Get Booking by ID
**GET** `/api/bookings/:id`

Get a specific booking by ID.

**URL Parameters:**
- `id` (required): Booking ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "bookingNumber": "BK1729012345678",
    "roomId": 1,
    "customerId": 1,
    "checkInDate": "2024-11-01",
    "checkOutDate": "2024-11-03",
    "numberOfGuests": 2,
    "numberOfNights": 2,
    "totalPrice": 4000.00,
    "status": "confirmed",
    "specialRequests": null,
    "room": { ... },
    "customer": { ... }
  }
}
```

---

### 3. Create Booking
**POST** `/api/bookings`

Create a new booking.

**Request Body:**
```json
{
  "roomId": 1,
  "customerData": {
    "fullName": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "phone": "0812345678"
  },
  "checkInDate": "2024-11-01",
  "checkOutDate": "2024-11-03",
  "numberOfGuests": 2,
  "specialRequests": "ต้องการห้องชั้นบน"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "bookingNumber": "BK1729012345678",
    "roomId": 1,
    "customerId": 1,
    "checkInDate": "2024-11-01",
    "checkOutDate": "2024-11-03",
    "numberOfGuests": 2,
    "numberOfNights": 2,
    "totalPrice": 4000.00,
    "status": "confirmed",
    "specialRequests": "ต้องการห้องชั้นบน",
    "room": { ... },
    "customer": { ... }
  }
}
```

**Validation:**
- Checks if room exists and is available
- Validates check-in and check-out dates
- Prevents overlapping bookings for the same room
- Creates customer if not exists, updates if exists

---

### 4. Update Booking
**PUT** `/api/bookings/:id`

Update an existing booking.

**URL Parameters:**
- `id` (required): Booking ID

**Request Body:** (all fields optional)
```json
{
  "checkInDate": "2024-11-02",
  "checkOutDate": "2024-11-04",
  "numberOfGuests": 3,
  "specialRequests": "ต้องการเตียงเสริม",
  "status": "confirmed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "id": 1,
    "bookingNumber": "BK1729012345678",
    "checkInDate": "2024-11-02",
    "checkOutDate": "2024-11-04",
    "numberOfGuests": 3,
    "numberOfNights": 2,
    "totalPrice": 4000.00,
    "status": "confirmed",
    "specialRequests": "ต้องการเตียงเสริม",
    "room": { ... },
    "customer": { ... }
  }
}
```

**Valid Status Values:**
- `confirmed`
- `cancelled`
- `completed`

---

### 5. Delete/Cancel Booking
**DELETE** `/api/bookings/:id`

Delete or cancel a booking.

**URL Parameters:**
- `id` (required): Booking ID

**Query Parameters:**
- `permanent` (optional): Set to `true` for permanent deletion, otherwise soft delete (cancel)

**Response (Soft Delete):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 1,
    "status": "cancelled",
    ...
  }
}
```

**Response (Permanent Delete):**
```json
{
  "success": true,
  "message": "Booking permanently deleted"
}
```

---

## Error Responses

**404 Not Found:**
```json
{
  "success": false,
  "message": "Booking not found"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Missing required fields"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Failed to create booking",
  "error": "Error details..."
}
```

---

## Running the Server

### Start the API server:
```bash
npm run server
```

### Start with auto-reload (development):
```bash
npm run server:dev
```

### Other useful commands:
```bash
# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

---

## Testing with cURL

### Get all bookings:
```bash
curl http://localhost:3001/api/bookings
```

### Create a booking:
```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": 1,
    "customerData": {
      "fullName": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "phone": "0812345678"
    },
    "checkInDate": "2024-11-01",
    "checkOutDate": "2024-11-03",
    "numberOfGuests": 2
  }'
```

### Update a booking:
```bash
curl -X PUT http://localhost:3001/api/bookings/1 \
  -H "Content-Type: application/json" \
  -d '{
    "numberOfGuests": 3,
    "status": "confirmed"
  }'
```

### Cancel a booking:
```bash
curl -X DELETE http://localhost:3001/api/bookings/1
```

### Permanently delete a booking:
```bash
curl -X DELETE "http://localhost:3001/api/bookings/1?permanent=true"
```

---

## Features

✅ **Complete CRUD Operations** - Create, Read, Update, Delete bookings
✅ **Smart Customer Management** - Auto-create or update customer records
✅ **Booking Validation** - Prevent overlapping bookings
✅ **Date Validation** - Ensure check-out is after check-in
✅ **Auto-calculation** - Calculate nights and total price automatically
✅ **Soft Delete** - Cancel bookings without permanent deletion
✅ **Filtering** - Filter bookings by status, customer, or room
✅ **Relations** - Include room and customer details in responses
✅ **Error Handling** - Comprehensive error messages

---

## Database Schema

The API uses these Prisma models:

- **Room** - Hotel room information
- **Customer** - Customer information
- **Booking** - Booking records with relations to Room and Customer
