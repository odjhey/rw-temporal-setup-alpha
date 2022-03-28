import { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

export const workflowRunResults = () => {
  return db.workflowRunResult.findMany({
    select: {
      id: true,
      temporalWorkflowId: true,
    },
  })
}

export const workflowRunResult = async ({
  id,
}: Prisma.WorkflowRunResultWhereUniqueInput) => {
  const stats = await db.$queryRaw(
    Prisma.sql`SELECT id,
                      "temporalWorkflowId",
                      pg_column_size(result) as "resultSize"
                FROM "WorkflowRunResult"
                WHERE id = ${id}`
  )
  // stats [ { id: 10, temporalWorkflowId: 'asdf123', resultSize: 69461 } ]

  if (stats[0] && stats[0].resultSize > 1240000 * 5) {
    // > 5MB : result too large to query
    return db.workflowRunResult.findUnique({
      where: { id },
      select: {
        id: true,
        temporalWorkflowId: true,
      },
    })
  }

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
