import type { EditWorkflowRunById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import WorkflowRunForm from 'src/components/WorkflowRun/WorkflowRunForm'

export const QUERY = gql`
  query EditWorkflowRunById($id: Int!) {
    workflowRun: workflowRun(id: $id) {
      id
      temporalWorkflowId
    }
  }
`
const UPDATE_WORKFLOW_RUN_MUTATION = gql`
  mutation UpdateWorkflowRunMutation($id: Int!, $input: UpdateWorkflowRunInput!) {
    updateWorkflowRun(id: $id, input: $input) {
      id
      temporalWorkflowId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workflowRun }: CellSuccessProps<EditWorkflowRunById>) => {
  const [updateWorkflowRun, { loading, error }] = useMutation(UPDATE_WORKFLOW_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRun updated')
      navigate(routes.workflowRuns())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateWorkflowRun({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit WorkflowRun {workflowRun.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunForm workflowRun={workflowRun} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
