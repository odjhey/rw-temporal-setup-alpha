import type { FindWorkflowRunSources } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import WorkflowRunSources from 'src/components/WorkflowRunSource/WorkflowRunSources'

export const QUERY = gql`
  query FindWorkflowRunSources {
    workflowRunSources {
      id
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workflowRunSources yet. '}
      <Link
        to={routes.newWorkflowRunSource()}
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

export const Success = ({ workflowRunSources }: CellSuccessProps<FindWorkflowRunSources>) => {
  return <WorkflowRunSources workflowRunSources={workflowRunSources} />
}
