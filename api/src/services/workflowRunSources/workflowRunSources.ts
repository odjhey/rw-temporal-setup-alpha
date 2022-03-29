import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'
import { getClient, getFileList } from 'src/lib/objectStoreClient'
import * as WfEnvTest from 'src/workflowServices/wfEnvTest'

export const workflowRunSources = async () => {
  await WfEnvTest.runWorkflow({ wfId: `some-test-${Date.now()}`, args: '' })

  return db.workflowRunSource.findMany()
}

export const fileSources = async () => {
  const files = await getFileList(getClient())
  console.log('fffileds', files)
  const bucket = 'bucket123'

  return (files as any[]).map((f) => ({
    slug: `${bucket}/${f.name}`,
  }))
}

export const workflowRunSource = ({
  id,
}: Prisma.WorkflowRunSourceWhereUniqueInput) => {
  return db.workflowRunSource.findUnique({
    where: { id },
  })
}

interface CreateWorkflowRunSourceArgs {
  input: Prisma.WorkflowRunSourceCreateInput
}

export const createWorkflowRunSource = ({
  input,
}: CreateWorkflowRunSourceArgs) => {
  return db.workflowRunSource.create({
    data: input,
  })
}

interface UpdateWorkflowRunSourceArgs
  extends Prisma.WorkflowRunSourceWhereUniqueInput {
  input: Prisma.WorkflowRunSourceUpdateInput
}

export const updateWorkflowRunSource = ({
  id,
  input,
}: UpdateWorkflowRunSourceArgs) => {
  return db.workflowRunSource.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkflowRunSource = ({
  id,
}: Prisma.WorkflowRunSourceWhereUniqueInput) => {
  return db.workflowRunSource.delete({
    where: { id },
  })
}
