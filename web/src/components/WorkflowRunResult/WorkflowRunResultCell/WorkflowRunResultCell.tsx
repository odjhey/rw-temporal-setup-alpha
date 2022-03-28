import type { FindWorkflowRunResultById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WorkflowRunResult from 'src/components/WorkflowRunResult/WorkflowRunResult'

export const QUERY = gql`
  query FindWorkflowRunResultById($id: Int!) {
    workflowRunResult: workflowRunResult(id: $id) {
      id
      temporalWorkflowId
      result
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>WorkflowRunResult not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  workflowRunResult,
}: CellSuccessProps<FindWorkflowRunResultById>) => {
  return <WorkflowRunResult workflowRunResult={workflowRunResult} />
}
