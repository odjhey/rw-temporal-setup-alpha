import type { EditWorkflowRunSourceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import WorkflowRunSourceForm from 'src/components/WorkflowRunSource/WorkflowRunSourceForm'

export const QUERY = gql`
  query EditWorkflowRunSourceById($id: Int!) {
    workflowRunSource: workflowRunSource(id: $id) {
      id
      slug
    }
  }
`
const UPDATE_WORKFLOW_RUN_SOURCE_MUTATION = gql`
  mutation UpdateWorkflowRunSourceMutation($id: Int!, $input: UpdateWorkflowRunSourceInput!) {
    updateWorkflowRunSource(id: $id, input: $input) {
      id
      slug
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workflowRunSource }: CellSuccessProps<EditWorkflowRunSourceById>) => {
  const [updateWorkflowRunSource, { loading, error }] = useMutation(UPDATE_WORKFLOW_RUN_SOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunSource updated')
      navigate(routes.workflowRunSources())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateWorkflowRunSource({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit WorkflowRunSource {workflowRunSource.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunSourceForm workflowRunSource={workflowRunSource} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
