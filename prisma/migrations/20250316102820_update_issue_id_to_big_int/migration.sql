/*
  Warnings:

  - Changed the type of `issueId` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "issueId",
ADD COLUMN     "issueId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Issue_issueId_key" ON "Issue"("issueId");
