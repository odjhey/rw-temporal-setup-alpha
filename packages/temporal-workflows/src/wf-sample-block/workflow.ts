import * as wf from '@temporalio/workflow'
import type * as activities from './activities'

const { activityReadLine } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})

export const unblockSignal = wf.defineSignal('unblock')
export const isBlockedQuery = wf.defineQuery<boolean>('isBlocked')
export const statusQuery = wf.defineQuery<string>('status')

export async function WorkflowUnblockOrCancel({
  bucket,
  filePath,
}: {
  bucket: string
  filePath: string
}): Promise<void> {
  let isBlocked = true
  let status = 'PENDING'
  wf.setHandler(unblockSignal, () => void (isBlocked = false))
  wf.setHandler(isBlockedQuery, () => isBlocked)
  wf.setHandler(statusQuery, () => status)

  try {
    await wf.condition(() => !isBlocked)
    status = 'READING-FILE'
    await wf.sleep(10000)
    await activityReadLine({ bucket, filePath })
    status = 'DONE'
  } catch (err) {
    if (err instanceof wf.CancelledFailure) {
      console.log('Cancelled')
    }
    throw err
  }
}
