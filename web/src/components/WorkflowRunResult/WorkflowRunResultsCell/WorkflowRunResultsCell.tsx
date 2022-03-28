import type { FindWorkflowRunResults } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import WorkflowRunResults from 'src/components/WorkflowRunResult/WorkflowRunResults'

export const QUERY = gql`
  query FindWorkflowRunResults {
    workflowRunResults {
      id
      temporalWorkflowId
      result
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workflowRunResults yet. '}
      <Link
        to={routes.newWorkflowRunResult()}
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

export const Success = ({ workflowRunResults }: CellSuccessProps<FindWorkflowRunResults>) => {
  return <WorkflowRunResults workflowRunResults={workflowRunResults} />
}
