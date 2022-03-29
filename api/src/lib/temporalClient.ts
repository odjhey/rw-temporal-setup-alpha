import { Connection, WorkflowClient } from '@temporalio/client'
import { WorkflowA, WorkflowB } from 'temporal-workflows/dist/all-workflows'

export async function runWorkflow() {
  const connection = new Connection() // Connect to localhost with default ConnectionOptions.
  // In production, pass options to the Connection constructor to configure TLS and other settings.
  // This is optional but we leave this here to remind you there is a gRPC connection being established.

  const client = new WorkflowClient(connection.service, {
    // In production you will likely specify `namespace` here; it is 'default' if omitted
  })

  // Invoke the `WorkflowA` Workflow, only resolved when the workflow completes
  const result = await client.execute(WorkflowA, {
    taskQueue: 'monorepo',
    workflowId: 'workflow-a-' + Date.now(), // TODO: remember to replace this with a meaningful business ID
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

export function getWfClient() {
  const connection = new Connection() // Connect to localhost with default ConnectionOptions.
  // In production, pass options to the Connection constructor to configure TLS and other settings.
  // This is optional but we leave this here to remind you there is a gRPC connection being established.

  const client = new WorkflowClient(connection.service, {
    // In production you will likely specify `namespace` here; it is 'default' if omitted
  })

  return client
}
