-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'RENT',
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'COMMERCIAL';
