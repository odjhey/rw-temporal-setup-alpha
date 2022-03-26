import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'
import * as temporalClient from 'src/lib/temporalClient'

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
  try {
    console.log('startt')
    temporalClient.runWorkflow().catch((err) => {
      console.error('err', err)
    })
  } catch (err) {
    console.error('catch err', err)
  }
  console.log('done')

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
