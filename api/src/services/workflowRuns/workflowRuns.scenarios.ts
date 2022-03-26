import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorkflowRunCreateArgs>({
  workflowRun: {
    one: { data: { temporalWorkflowId: 'String' } },
    two: { data: { temporalWorkflowId: 'String' } },
  },
})

export type StandardScenario = typeof standard
