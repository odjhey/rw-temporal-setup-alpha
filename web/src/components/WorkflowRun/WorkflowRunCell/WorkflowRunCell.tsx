import type { FindWorkflowRunById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WorkflowRun from 'src/components/WorkflowRun/WorkflowRun'

export const QUERY = gql`
  query FindWorkflowRunById($id: Int!) {
    workflowRun: workflowRun(id: $id) {
      id
      temporalWorkflowId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>WorkflowRun not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workflowRun }: CellSuccessProps<FindWorkflowRunById>) => {
  return <WorkflowRun workflowRun={workflowRun} />
}
