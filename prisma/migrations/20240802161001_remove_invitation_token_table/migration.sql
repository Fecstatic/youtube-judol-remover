/*
  Warnings:

  - You are about to drop the `invite_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,token]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `invites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invite_tokens" DROP CONSTRAINT "invite_tokens_inv_id_fkey";

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;

-- DropTable
DROP TABLE "invite_tokens";

-- CreateIndex
CREATE UNIQUE INDEX "invites_token_key" ON "invites"("token");

-- CreateIndex
CREATE UNIQUE INDEX "invites_id_token_key" ON "invites"("id", "token");
