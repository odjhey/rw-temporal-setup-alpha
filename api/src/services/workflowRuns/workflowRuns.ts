import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'
// import * as WfFirst from 'src/workflowServices/wfFirst'
import * as WfSomeSome from 'src/workflowServices/wfUnblockOrCancel'

export const workflowRuns = () => {
  return db.workflowRun.findMany()
}

export const workflowRun = async ({
  id,
}: Prisma.WorkflowRunWhereUniqueInput) => {
  const wfRunDbEntry = await db.workflowRun.findUnique({
    where: { id },
  })
  const temporalStatus = await WfSomeSome.queryStatus({ wfId: `${id}` })
  return {
    ...wfRunDbEntry,
    temporalStatus: temporalStatus ? 'blocked' : 'NOTB',
  }
}

interface CreateWorkflowRunArgs {
  input: Prisma.WorkflowRunCreateInput
}

export const createWorkflowRun = async ({ input }: CreateWorkflowRunArgs) => {
  const wfRunDbEntry = await db.workflowRun.create({
    data: input,
  })

  /*
  try {
    WfFirst.runWorkflow({ wfId: wfRunDbEntry.id }).catch((err) => {
      console.error('err', err)
    })
  } catch (err) {
    console.error('catch err', err)
  }
  */
  try {
    WfSomeSome.runWorkflow({ wfId: wfRunDbEntry.id }).catch((err) => {
      console.error('err', err)
    })
  } catch (err) {
    console.error('catch err', err)
  }

  return wfRunDbEntry
}

export const unblock = async ({ id }) => {
  const wfRun = await db.workflowRun.findUnique({
    where: { id },
  })

  try {
    const blockedStat = WfSomeSome.unblockStatus({ wfId: `${wfRun.id}` }).catch(
      (err) => {
        console.error('err', err)
      }
    )
    return { ...wfRun, temporalStatus: blockedStat ? 'blocked' : 'NOTB' }
  } catch (err) {
    console.error('catch err', err)
  }

  return { ...wfRun }
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

/*
export const WorkflowRun = {
  temporalStatus: (parent) => {
  }
}
*/
