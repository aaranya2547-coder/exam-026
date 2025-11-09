/*
  Warnings:

  - You are about to drop the column `roomId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accommodationId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_roomId_fkey`;

-- DropIndex
DROP INDEX `bookings_roomId_idx` ON `bookings`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `roomId`,
    ADD COLUMN `accommodationId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `rooms`;

-- CreateTable
CREATE TABLE `regions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `regions_name_key`(`name`),
    UNIQUE INDEX `regions_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `shortDesc` VARCHAR(255) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `pricePerNight` DECIMAL(10, 2) NOT NULL,
    `maxGuests` INTEGER NOT NULL,
    `address` TEXT NOT NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `amenities` TEXT NULL,
    `images` TEXT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `accommodations_slug_key`(`slug`),
    INDEX `accommodations_regionId_idx`(`regionId`),
    INDEX `accommodations_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `bookings_accommodationId_idx` ON `bookings`(`accommodationId`);

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `regions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_accommodationId_fkey` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
