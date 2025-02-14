-- CreateTable
CREATE TABLE "rank_single" (
    "id" BIGSERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "wpm" INTEGER NOT NULL,
    "record_date" DATE NOT NULL,

    CONSTRAINT "rank_single_pkey" PRIMARY KEY ("id")
);
