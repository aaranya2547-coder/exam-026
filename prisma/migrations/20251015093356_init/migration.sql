-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roomType` VARCHAR(50) NOT NULL,
    `roomName` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `pricePerNight` DECIMAL(10, 2) NOT NULL,
    `maxGuests` INTEGER NOT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `imageUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingNumber` VARCHAR(50) NOT NULL,
    `roomId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,
    `checkInDate` DATE NOT NULL,
    `checkOutDate` DATE NOT NULL,
    `numberOfGuests` INTEGER NOT NULL,
    `numberOfNights` INTEGER NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'confirmed',
    `specialRequests` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookings_bookingNumber_key`(`bookingNumber`),
    INDEX `bookings_roomId_idx`(`roomId`),
    INDEX `bookings_customerId_idx`(`customerId`),
    INDEX `bookings_checkInDate_checkOutDate_idx`(`checkInDate`, `checkOutDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
