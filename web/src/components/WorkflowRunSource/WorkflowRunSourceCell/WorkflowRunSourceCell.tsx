import type { FindWorkflowRunSourceById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import WorkflowRunSource from 'src/components/WorkflowRunSource/WorkflowRunSource'

export const QUERY = gql`
  query FindWorkflowRunSourceById($id: Int!) {
    workflowRunSource: workflowRunSource(id: $id) {
      id
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>WorkflowRunSource not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workflowRunSource }: CellSuccessProps<FindWorkflowRunSourceById>) => {
  return <WorkflowRunSource workflowRunSource={workflowRunSource} />
}
