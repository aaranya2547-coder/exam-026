-- AlterTable
ALTER TABLE `accommodations` ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `provinceId` INTEGER NULL,
    ADD COLUMN `rating` DECIMAL(3, 2) NULL;

-- CreateTable
CREATE TABLE `provinces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `regionId` INTEGER NOT NULL,
    `description` TEXT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `provinces_name_key`(`name`),
    UNIQUE INDEX `provinces_slug_key`(`slug`),
    INDEX `provinces_regionId_idx`(`regionId`),
    INDEX `provinces_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `discountType` VARCHAR(20) NOT NULL,
    `discountValue` DECIMAL(10, 2) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `season` VARCHAR(100) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `minNights` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `promotions_slug_key`(`slug`),
    INDEX `promotions_slug_idx`(`slug`),
    INDEX `promotions_isActive_idx`(`isActive`),
    INDEX `promotions_startDate_endDate_idx`(`startDate`, `endDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodation_promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accommodationId` INTEGER NOT NULL,
    `promotionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `accommodation_promotions_accommodationId_idx`(`accommodationId`),
    INDEX `accommodation_promotions_promotionId_idx`(`promotionId`),
    UNIQUE INDEX `accommodation_promotions_accommodationId_promotionId_key`(`accommodationId`, `promotionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `accommodations_provinceId_idx` ON `accommodations`(`provinceId`);

-- CreateIndex
CREATE INDEX `accommodations_isFeatured_idx` ON `accommodations`(`isFeatured`);

-- AddForeignKey
ALTER TABLE `provinces` ADD CONSTRAINT `provinces_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `regions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodations` ADD CONSTRAINT `accommodations_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `provinces`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodation_promotions` ADD CONSTRAINT `accommodation_promotions_accommodationId_fkey` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodation_promotions` ADD CONSTRAINT `accommodation_promotions_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `promotions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
