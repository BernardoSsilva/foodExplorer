/*
  Warnings:

  - A unique constraint covering the columns `[foodIdImage]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_foodIdImage_key" ON "Image"("foodIdImage");
