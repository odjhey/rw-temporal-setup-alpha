import {
  workflowRuns,
  workflowRun,
  createWorkflowRun,
  updateWorkflowRun,
  deleteWorkflowRun,
} from './workflowRuns'
import type { StandardScenario } from './workflowRuns.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workflowRuns', () => {
  scenario('returns all workflowRuns', async (scenario: StandardScenario) => {
    const result = await workflowRuns()

    expect(result.length).toEqual(Object.keys(scenario.workflowRun).length)
  })

  scenario(
    'returns a single workflowRun',
    async (scenario: StandardScenario) => {
      const result = await workflowRun({ id: scenario.workflowRun.one.id })

      expect(result).toEqual(scenario.workflowRun.one)
    }
  )

  scenario('creates a workflowRun', async () => {
    const result = await createWorkflowRun({
      input: { temporalWorkflowId: 'String' },
    })

    expect(result.temporalWorkflowId).toEqual('String')
  })

  scenario('updates a workflowRun', async (scenario: StandardScenario) => {
    const original = await workflowRun({ id: scenario.workflowRun.one.id })
    const result = await updateWorkflowRun({
      id: original.id,
      input: { temporalWorkflowId: 'String2' },
    })

    expect(result.temporalWorkflowId).toEqual('String2')
  })

  scenario('deletes a workflowRun', async (scenario: StandardScenario) => {
    const original = await deleteWorkflowRun({
      id: scenario.workflowRun.one.id,
    })
    const result = await workflowRun({ id: original.id })

    expect(result).toEqual(null)
  })
})
