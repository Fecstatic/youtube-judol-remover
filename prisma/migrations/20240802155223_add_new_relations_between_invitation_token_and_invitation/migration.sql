/*
  Warnings:

  - A unique constraint covering the columns `[inv_id]` on the table `invite_tokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inv_id,token]` on the table `invite_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inv_id` to the `invite_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "invite_tokens_id_token_key";

-- AlterTable
ALTER TABLE "invite_tokens" ADD COLUMN     "inv_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invite_tokens_inv_id_key" ON "invite_tokens"("inv_id");

-- CreateIndex
CREATE UNIQUE INDEX "invite_tokens_inv_id_token_key" ON "invite_tokens"("inv_id", "token");

-- AddForeignKey
ALTER TABLE "invite_tokens" ADD CONSTRAINT "invite_tokens_inv_id_fkey" FOREIGN KEY ("inv_id") REFERENCES "invites"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
