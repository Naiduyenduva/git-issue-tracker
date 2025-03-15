/*
  Warnings:

  - You are about to drop the column `webhookUrl` on the `Repository` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Repository_webhookUrl_key";

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "webhookUrl";
