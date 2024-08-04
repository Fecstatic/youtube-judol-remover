/*
  Warnings:

  - Added the required column `device` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Device" AS ENUM ('MOBILE', 'DESKTOP');

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropIndex
DROP INDEX "notifications_userId_key";

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "device" "Device" NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_email_fkey" FOREIGN KEY ("userId", "email") REFERENCES "users"("id", "email") ON DELETE CASCADE ON UPDATE CASCADE;
