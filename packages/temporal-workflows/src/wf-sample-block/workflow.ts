import * as wf from '@temporalio/workflow'

export const unblockSignal = wf.defineSignal('unblock')
export const isBlockedQuery = wf.defineQuery<boolean>('isBlocked')

export async function WorkflowUnblockOrCancel(): Promise<void> {
  let isBlocked = true
  wf.setHandler(unblockSignal, () => void (isBlocked = false))
  wf.setHandler(isBlockedQuery, () => isBlocked)

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
