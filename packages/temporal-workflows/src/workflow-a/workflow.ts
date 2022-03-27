import { proxyActivities, sleep } from '@temporalio/workflow'
// Only import the activity types
import type * as activitiesA from './activities/activities-a'
import type * as activitiesB from './activities/activities-b'

const { activityA } = proxyActivities<typeof activitiesA>({
  startToCloseTimeout: '1 minute',
})
const { activityB } = proxyActivities<typeof activitiesB>({
  startToCloseTimeout: '1 minute',
})

export async function WorkflowA(name: string): Promise<string> {
  console.log('Hello from WorkflowA dn')
  const res1 = await activityA(name)
  await sleep(100)
  const res2 = await activityB(name)
  return `A: ${res1} | B: ${res2}`
}
