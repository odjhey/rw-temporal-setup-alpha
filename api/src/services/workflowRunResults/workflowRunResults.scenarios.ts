import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorkflowRunResultCreateArgs>({
  workflowRunResult: {
    one: { data: { temporalWorkflowId: 'String', result: { foo: 'bar' } } },
    two: { data: { temporalWorkflowId: 'String', result: { foo: 'bar' } } },
  },
})

export type StandardScenario = typeof standard
