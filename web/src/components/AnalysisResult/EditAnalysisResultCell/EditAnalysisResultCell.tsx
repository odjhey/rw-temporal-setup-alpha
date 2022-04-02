import type { EditAnalysisResultById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import AnalysisResultForm from 'src/components/AnalysisResult/AnalysisResultForm'

export const QUERY = gql`
  query EditAnalysisResultById($id: String!) {
    analysisResult: analysisResult(id: $id) {
      id
      createdAt
      updatedAt
      ref
      source
      rawJson
      schemaVersion
    }
  }
`
const UPDATE_ANALYSIS_RESULT_MUTATION = gql`
  mutation UpdateAnalysisResultMutation($id: String!, $input: UpdateAnalysisResultInput!) {
    updateAnalysisResult(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      ref
      source
      rawJson
      schemaVersion
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ analysisResult }: CellSuccessProps<EditAnalysisResultById>) => {
  const [updateAnalysisResult, { loading, error }] = useMutation(UPDATE_ANALYSIS_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('AnalysisResult updated')
      navigate(routes.analysisResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateAnalysisResult({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit AnalysisResult {analysisResult.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AnalysisResultForm analysisResult={analysisResult} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
