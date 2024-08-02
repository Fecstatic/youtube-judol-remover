/*
  Warnings:

  - The `role` column on the `invites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_org_id_fkey";

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "role",
ADD COLUMN     "role" "OrgRole" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
