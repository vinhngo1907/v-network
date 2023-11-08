/*
  Warnings:

  - You are about to drop the `Exchange` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exchange";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "token" TEXT,
    "created" TIMESTAMP(3) NOT NULL,
    "createAt" BIGINT NOT NULL,
    "updateAt" BIGINT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
