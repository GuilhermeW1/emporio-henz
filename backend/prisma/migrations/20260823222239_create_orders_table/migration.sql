/*
  Warnings:

  - You are about to drop the column `email` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `item` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Subscription_email_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "order" TEXT NOT NULL;
