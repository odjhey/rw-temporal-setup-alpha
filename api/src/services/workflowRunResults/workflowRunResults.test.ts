import {
  workflowRunResults,
  workflowRunResult,
  createWorkflowRunResult,
  updateWorkflowRunResult,
  deleteWorkflowRunResult,
} from './workflowRunResults'
import type { StandardScenario } from './workflowRunResults.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workflowRunResults', () => {
  scenario(
    'returns all workflowRunResults',
    async (scenario: StandardScenario) => {
      const result = await workflowRunResults()

      expect(result.length).toEqual(
        Object.keys(scenario.workflowRunResult).length
      )
    }
  )

  scenario(
    'returns a single workflowRunResult',
    async (scenario: StandardScenario) => {
      const result = await workflowRunResult({
        id: scenario.workflowRunResult.one.id,
      })

      expect(result).toEqual(scenario.workflowRunResult.one)
    }
  )

  scenario('creates a workflowRunResult', async () => {
    const result = await createWorkflowRunResult({
      input: { temporalWorkflowId: 'String', result: { foo: 'bar' } },
    })

    expect(result.temporalWorkflowId).toEqual('String')
    expect(result.result).toEqual({ foo: 'bar' })
  })

  scenario(
    'updates a workflowRunResult',
    async (scenario: StandardScenario) => {
      const original = await workflowRunResult({
        id: scenario.workflowRunResult.one.id,
      })
      const result = await updateWorkflowRunResult({
        id: original.id,
        input: { temporalWorkflowId: 'String2' },
      })

      expect(result.temporalWorkflowId).toEqual('String2')
    }
  )

  scenario(
    'deletes a workflowRunResult',
    async (scenario: StandardScenario) => {
      const original = await deleteWorkflowRunResult({
        id: scenario.workflowRunResult.one.id,
      })
      const result = await workflowRunResult({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
