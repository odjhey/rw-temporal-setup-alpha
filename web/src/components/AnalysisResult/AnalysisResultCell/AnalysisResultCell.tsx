import type { FindAnalysisResultById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AnalysisResult from 'src/components/AnalysisResult/AnalysisResult'

export const QUERY = gql`
  query FindAnalysisResultById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>AnalysisResult not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ analysisResult }: CellSuccessProps<FindAnalysisResultById>) => {
  return <AnalysisResult analysisResult={analysisResult} />
}
