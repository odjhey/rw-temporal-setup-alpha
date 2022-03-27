import {
  workflowRunSources,
  workflowRunSource,
  createWorkflowRunSource,
  updateWorkflowRunSource,
  deleteWorkflowRunSource,
} from './workflowRunSources'
import type { StandardScenario } from './workflowRunSources.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workflowRunSources', () => {
  scenario(
    'returns all workflowRunSources',
    async (scenario: StandardScenario) => {
      const result = await workflowRunSources()

      expect(result.length).toEqual(
        Object.keys(scenario.workflowRunSource).length
      )
    }
  )

  scenario(
    'returns a single workflowRunSource',
    async (scenario: StandardScenario) => {
      const result = await workflowRunSource({
        id: scenario.workflowRunSource.one.id,
      })

      expect(result).toEqual(scenario.workflowRunSource.one)
    }
  )

  scenario('creates a workflowRunSource', async () => {
    const result = await createWorkflowRunSource({
      input: { slug: 'String' },
    })

    expect(result.slug).toEqual('String')
  })

  scenario(
    'updates a workflowRunSource',
    async (scenario: StandardScenario) => {
      const original = await workflowRunSource({
        id: scenario.workflowRunSource.one.id,
      })
      const result = await updateWorkflowRunSource({
        id: original.id,
        input: { slug: 'String2' },
      })

      expect(result.slug).toEqual('String2')
    }
  )

  scenario(
    'deletes a workflowRunSource',
    async (scenario: StandardScenario) => {
      const original = await deleteWorkflowRunSource({
        id: scenario.workflowRunSource.one.id,
      })
      const result = await workflowRunSource({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
