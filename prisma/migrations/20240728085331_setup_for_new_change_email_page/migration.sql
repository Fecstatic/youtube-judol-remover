-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_org_id_org_name_picture_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_user_id_email_fkey";

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_org_id_org_name_picture_fkey" FOREIGN KEY ("org_id", "org_name", "picture") REFERENCES "organizations"("id", "name", "picture") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_user_id_email_fkey" FOREIGN KEY ("user_id", "email") REFERENCES "users"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
