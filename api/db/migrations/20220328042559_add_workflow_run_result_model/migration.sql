-- CreateTable
CREATE TABLE "WorkflowRunResult" (
    "id" SERIAL NOT NULL,
    "temporalWorkflowId" TEXT NOT NULL,
    "result" JSONB NOT NULL,

    CONSTRAINT "WorkflowRunResult_pkey" PRIMARY KEY ("id")
);
