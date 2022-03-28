/*
  Warnings:

  - A unique constraint covering the columns `[temporalWorkflowId]` on the table `WorkflowRun` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resultId` to the `WorkflowRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkflowRun" ADD COLUMN     "resultId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkflowRun_temporalWorkflowId_key" ON "WorkflowRun"("temporalWorkflowId");
