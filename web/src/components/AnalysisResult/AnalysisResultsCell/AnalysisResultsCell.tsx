import type { FindAnalysisResults } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import AnalysisResults from 'src/components/AnalysisResult/AnalysisResults'

export const QUERY = gql`
  query FindAnalysisResults {
    analysisResults {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No analysisResults yet. '}
      <Link
        to={routes.newAnalysisResult()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ analysisResults }: CellSuccessProps<FindAnalysisResults>) => {
  return <AnalysisResults analysisResults={analysisResults} />
}
