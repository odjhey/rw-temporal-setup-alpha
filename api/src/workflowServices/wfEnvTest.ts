import { getWfClient } from 'src/lib/temporalClient'
import { Workflows } from 'temporal-workflows'

const { WorkflowEnv } = Workflows

export async function runWorkflow({ wfId, args: _args }) {
  const client = getWfClient()

  console.log('rw world')
  await client.start(WorkflowEnv, {
    taskQueue: 'monorepo',
    workflowId: `${wfId}`, // TODO: remember to replace this with a meaningful business ID
  })
}
