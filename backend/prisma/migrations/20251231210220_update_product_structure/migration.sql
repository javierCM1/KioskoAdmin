/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barcode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buyPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    ADD COLUMN `barcode` VARCHAR(191) NULL,
    ADD COLUMN `buyPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `sellPrice` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_barcode_key` ON `Product`(`barcode`);
