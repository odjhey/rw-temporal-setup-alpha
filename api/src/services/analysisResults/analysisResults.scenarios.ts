import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AnalysisResultCreateArgs>({
  analysisResult: {
    one: {
      data: {
        id: 'String',
        updatedAt: '2022-04-02T03:28:05Z',
        ref: 'String7832200',
        source: 'String',
        rawJson: { foo: 'bar' },
        schemaVersion: 'String',
      },
    },
    two: {
      data: {
        id: 'String',
        updatedAt: '2022-04-02T03:28:05Z',
        ref: 'String7759883',
        source: 'String',
        rawJson: { foo: 'bar' },
        schemaVersion: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
