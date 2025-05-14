-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "facilityName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "prefecture" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "facilityType" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "disabilityTypes" TEXT[],
    "specialties" TEXT[],
    "description" TEXT,
    "websiteUrl" TEXT,
    "imageUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facility_email_key" ON "Facility"("email");
