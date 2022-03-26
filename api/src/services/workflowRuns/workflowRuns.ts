import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

export const workflowRuns = () => {
  return db.workflowRun.findMany()
}

export const workflowRun = ({ id }: Prisma.WorkflowRunWhereUniqueInput) => {
  return db.workflowRun.findUnique({
    where: { id },
  })
}

interface CreateWorkflowRunArgs {
  input: Prisma.WorkflowRunCreateInput
}

export const createWorkflowRun = ({ input }: CreateWorkflowRunArgs) => {
  return db.workflowRun.create({
    data: input,
  })
}

interface UpdateWorkflowRunArgs extends Prisma.WorkflowRunWhereUniqueInput {
  input: Prisma.WorkflowRunUpdateInput
}

export const updateWorkflowRun = ({ id, input }: UpdateWorkflowRunArgs) => {
  return db.workflowRun.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkflowRun = ({
  id,
}: Prisma.WorkflowRunWhereUniqueInput) => {
  return db.workflowRun.delete({
    where: { id },
  })
}
