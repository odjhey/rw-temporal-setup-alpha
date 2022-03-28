import type { FindWorkflowRuns } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import WorkflowRuns from 'src/components/WorkflowRun/WorkflowRuns'

export const QUERY = gql`
  query FindWorkflowRuns {
    workflowRuns {
      id
      temporalWorkflowId
      fileInput
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workflowRuns yet. '}
      <Link to={routes.newWorkflowRun()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  workflowRuns,
}: CellSuccessProps<FindWorkflowRuns>) => {
  return <WorkflowRuns workflowRuns={workflowRuns} />
}
