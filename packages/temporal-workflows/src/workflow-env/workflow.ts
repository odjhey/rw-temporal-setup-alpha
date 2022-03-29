import { proxyActivities } from '@temporalio/workflow'
import type * as activities from './activities'

const { printProcessEnv } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
})

export async function WorkflowEnv() {
  await printProcessEnv()
}
