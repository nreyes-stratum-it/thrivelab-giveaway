-- CreateTable
CREATE TABLE "giveaway_entries" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "instagramHandle" TEXT,
    "painArea" TEXT NOT NULL,
    "painAreaOther" TEXT,
    "reasons" TEXT[],
    "interestLevel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "giveaway_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "giveaway_entries_email_key" ON "giveaway_entries"("email");
