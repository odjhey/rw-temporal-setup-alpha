import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.WorkflowRunSourceCreateArgs>({
  workflowRunSource: {
    one: { data: { slug: 'String' } },
    two: { data: { slug: 'String' } },
  },
})

export type StandardScenario = typeof standard
