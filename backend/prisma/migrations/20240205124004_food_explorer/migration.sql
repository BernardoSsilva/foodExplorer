-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "foods" (
    "food_id" TEXT NOT NULL,
    "food_name" TEXT NOT NULL,
    "food_ingredients" TEXT[],
    "food_description" TEXT NOT NULL,
    "food_price" DOUBLE PRECISION NOT NULL,
    "food_image_name" TEXT NOT NULL,
    "food_image_stored_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("food_id")
);

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
