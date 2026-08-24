/*
  Warnings:

  - You are about to drop the column `createdIn` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "createdIn",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
