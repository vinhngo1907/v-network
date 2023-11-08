-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "token" TEXT,
    "created" TIMESTAMP(3) NOT NULL,
    "createAt" BIGINT NOT NULL,
    "updateAt" BIGINT NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);
