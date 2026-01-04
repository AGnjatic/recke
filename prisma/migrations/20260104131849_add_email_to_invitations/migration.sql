/*
  Warnings:

  - Added the required column `email` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_receiverId_fkey";

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "receiverId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Invitation_email_idx" ON "Invitation"("email");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
