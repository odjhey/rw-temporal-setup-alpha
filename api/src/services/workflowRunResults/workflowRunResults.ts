import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

export const workflowRunResults = () => {
  return db.workflowRunResult.findMany()
}

export const workflowRunResult = ({
  id,
}: Prisma.WorkflowRunResultWhereUniqueInput) => {
  return db.workflowRunResult.findUnique({
    where: { id },
  })
}

interface CreateWorkflowRunResultArgs {
  input: Prisma.WorkflowRunResultCreateInput
}

export const createWorkflowRunResult = ({
  input,
}: CreateWorkflowRunResultArgs) => {
  return db.workflowRunResult.create({
    data: input,
  })
}

interface UpdateWorkflowRunResultArgs
  extends Prisma.WorkflowRunResultWhereUniqueInput {
  input: Prisma.WorkflowRunResultUpdateInput
}

export const updateWorkflowRunResult = ({
  id,
  input,
}: UpdateWorkflowRunResultArgs) => {
  return db.workflowRunResult.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkflowRunResult = ({
  id,
}: Prisma.WorkflowRunResultWhereUniqueInput) => {
  return db.workflowRunResult.delete({
    where: { id },
  })
}
