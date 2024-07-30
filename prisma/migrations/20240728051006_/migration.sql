/*
  Warnings:

  - A unique constraint covering the columns `[id,name,picture]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_org_id_org_name_fkey";

-- DropIndex
DROP INDEX "organizations_id_name_key";

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "picture" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_name_picture_key" ON "organizations"("id", "name", "picture");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_org_id_org_name_picture_fkey" FOREIGN KEY ("org_id", "org_name", "picture") REFERENCES "organizations"("id", "name", "picture") ON DELETE RESTRICT ON UPDATE NO ACTION;
