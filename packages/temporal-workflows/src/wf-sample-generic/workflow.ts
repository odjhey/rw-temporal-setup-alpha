import * as wf from '@temporalio/workflow'
import type * as activities from './activities'

const {
  // activityReadLine,
  activityReadNumbers,
} = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '10 minute',
})

export const unblockSignal = wf.defineSignal('unblock')
export const isBlockedQuery = wf.defineQuery<boolean>('isBlocked')
export const statusQuery = wf.defineQuery<string>('status')

export async function WorkflowUnblockOrCancel({
  bucket,
  filePath,
  wfId,
}: {
  bucket: string
  filePath: string
  wfId: string
}): Promise<void> {
  let isBlocked = true
  let status = 'PENDING'
  wf.setHandler(unblockSignal, () => void (isBlocked = false))
  wf.setHandler(isBlockedQuery, () => isBlocked)
  wf.setHandler(statusQuery, () => status)

  try {
    await wf.condition(() => !isBlocked)
    status = 'READING-FILE'
    // await activityReadLine({ bucket, filePath })
    const result = await activityReadNumbers({ bucket, filePath, wfId })
    status = 'DONE'

    return result
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log('Cancelled')
    }
    throw err
  }
}
