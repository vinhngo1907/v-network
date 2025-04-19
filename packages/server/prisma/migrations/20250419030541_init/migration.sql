/*
  Warnings:

  - Added the required column `rfToken` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('NEW', 'VERIFIED', 'BANNED', 'DISABLED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('REGISTER', 'GOOGLE', 'FACEBOOK');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "rfToken" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" "AccountType" NOT NULL DEFAULT 'REGISTER';
