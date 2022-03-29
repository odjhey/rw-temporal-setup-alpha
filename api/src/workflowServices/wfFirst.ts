import { getWfClient } from 'src/lib/temporalClient'
import { WorkflowA, WorkflowB } from 'temporal-workflows/dist/all-workflows'

export async function runWorkflow({ wfId }) {
  const client = getWfClient()

  // Invoke the `WorkflowA` Workflow, only resolved when the workflow completes
  const result = await client.execute(WorkflowA, {
    taskQueue: 'monorepo',
    workflowId: `${wfId}`, // TODO: remember to replace this with a meaningful business ID
    args: ['Temporal'], // type inference works! args: [name: string]
  })
  // Starts the `WorkflowB` Workflow, don't wait for it to complete
  await client.start(WorkflowB, {
    taskQueue: 'monorepo',
    workflowId: 'workflow-b-' + Date.now(), // TODO: remember to replace this with a meaningful business ID
  })
  console.log(result) // // [api-server] A: Hello, Temporal!, B: Hello, Temporal!
  return result
}
