/*
  Warnings:

  - You are about to alter the column `description` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(400)`.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "description" SET DATA TYPE VARCHAR(400);
