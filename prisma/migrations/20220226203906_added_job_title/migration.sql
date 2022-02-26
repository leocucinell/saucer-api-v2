-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `description` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT '';
