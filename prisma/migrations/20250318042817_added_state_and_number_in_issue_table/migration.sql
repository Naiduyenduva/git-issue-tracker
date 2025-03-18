/*
  Warnings:

  - Added the required column `number` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
