-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ref" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "rawJson" JSONB NOT NULL,
    "schemaVersion" TEXT NOT NULL,

    CONSTRAINT "AnalysisResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawData" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "rawJson" JSONB NOT NULL,
    "idx" SERIAL NOT NULL,

    CONSTRAINT "RawData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisResult_ref_key" ON "AnalysisResult"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "RawData_idx_ref_key" ON "RawData"("idx", "ref");
