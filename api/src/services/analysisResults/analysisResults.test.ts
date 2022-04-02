import {
  analysisResults,
  analysisResult,
  createAnalysisResult,
  updateAnalysisResult,
  deleteAnalysisResult,
} from './analysisResults'
import type { StandardScenario } from './analysisResults.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('analysisResults', () => {
  scenario(
    'returns all analysisResults',
    async (scenario: StandardScenario) => {
      const result = await analysisResults()

      expect(result.length).toEqual(Object.keys(scenario.analysisResult).length)
    }
  )

  scenario(
    'returns a single analysisResult',
    async (scenario: StandardScenario) => {
      const result = await analysisResult({
        id: scenario.analysisResult.one.id,
      })

      expect(result).toEqual(scenario.analysisResult.one)
    }
  )

  scenario('creates a analysisResult', async () => {
    const result = await createAnalysisResult({
      input: {
        id: 'String',
        updatedAt: '2022-04-02T03:28:05Z',
        ref: 'String3721537',
        source: 'String',
        rawJson: { foo: 'bar' },
        schemaVersion: 'String',
      },
    })

    expect(result.id).toEqual('String')
    expect(result.updatedAt).toEqual('2022-04-02T03:28:05Z')
    expect(result.ref).toEqual('String3721537')
    expect(result.source).toEqual('String')
    expect(result.rawJson).toEqual({ foo: 'bar' })
    expect(result.schemaVersion).toEqual('String')
  })

  scenario('updates a analysisResult', async (scenario: StandardScenario) => {
    const original = await analysisResult({
      id: scenario.analysisResult.one.id,
    })
    const result = await updateAnalysisResult({
      id: original.id,
      input: { id: 'String2' },
    })

    expect(result.id).toEqual('String2')
  })

  scenario('deletes a analysisResult', async (scenario: StandardScenario) => {
    const original = await deleteAnalysisResult({
      id: scenario.analysisResult.one.id,
    })
    const result = await analysisResult({ id: original.id })

    expect(result).toEqual(null)
  })
})
