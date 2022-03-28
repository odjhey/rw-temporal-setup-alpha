import * as wf from '@temporalio/workflow'
import type * as activities from './activities'

const { activityReadLine } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})

export const unblockSignal = wf.defineSignal('unblock')
export const isBlockedQuery = wf.defineQuery<boolean>('isBlocked')

export async function WorkflowUnblockOrCancel({
  bucket,
  filePath,
}: {
  bucket: string
  filePath: string
}): Promise<void> {
  let isBlocked = true
  wf.setHandler(unblockSignal, () => void (isBlocked = false))
  wf.setHandler(isBlockedQuery, () => isBlocked)

  await activityReadLine({ bucket, filePath })

  try {
    await wf.condition(() => !isBlocked)
    console.log('unblocked')
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log('Cancelled')
    }
    throw err
  }
}
