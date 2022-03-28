import { getWfClient } from 'src/lib/temporalClient'
import {
  isBlockedQuery,
  WorkflowUnblockOrCancel,
  unblockSignal,
  statusQuery,
} from 'temporal-workflows/lib/all-workflows'

export async function runWorkflow({
  wfId,
  args,
}: {
  wfId: string
  args: { fileInput: string }
}) {
  const client = getWfClient()

  const values = args.fileInput.split('/')
  const bucket = values[0]
  const filePath = values.splice(1).join('/')

  console.log('buasdkfjl', { bucket, filePath })

  const result = await client.start(WorkflowUnblockOrCancel, {
    taskQueue: 'monorepo',
    workflowId: `${wfId}`, // TODO: remember to replace this with a meaningful business ID
    args: [
      {
        bucket,
        filePath,
        wfId,
      },
    ],
  })
  console.log(result) // // [api-server] A: Hello, Temporal!, B: Hello, Temporal!
  return result
}

export async function queryStatus({ wfId }) {
  const client = getWfClient()

  const handle = await client.getHandle(wfId)

  return handle.query(statusQuery)
}

export async function queryBlockedStatus({ wfId }) {
  const client = getWfClient()

  const handle = await client.getHandle(wfId)

  return handle.query(isBlockedQuery)
}

export async function unblockStatus({
  wfId,
}: {
  wfId: string
}): Promise<boolean> {
  console.log('try to unblock', wfId)
  const client = getWfClient()
  const handle = await client.getHandle(wfId)
  await handle.signal(unblockSignal)
  return handle.query(isBlockedQuery)
}
