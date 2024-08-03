/*
  Warnings:

  - The `enabledThemes` column on the `Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "enabledThemes",
ADD COLUMN     "enabledThemes" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");
