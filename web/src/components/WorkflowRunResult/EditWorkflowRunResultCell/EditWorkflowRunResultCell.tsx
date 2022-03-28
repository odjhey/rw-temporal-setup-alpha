import type { EditWorkflowRunResultById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import WorkflowRunResultForm from 'src/components/WorkflowRunResult/WorkflowRunResultForm'

export const QUERY = gql`
  query EditWorkflowRunResultById($id: Int!) {
    workflowRunResult: workflowRunResult(id: $id) {
      id
      temporalWorkflowId
      result
    }
  }
`
const UPDATE_WORKFLOW_RUN_RESULT_MUTATION = gql`
  mutation UpdateWorkflowRunResultMutation($id: Int!, $input: UpdateWorkflowRunResultInput!) {
    updateWorkflowRunResult(id: $id, input: $input) {
      id
      temporalWorkflowId
      result
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workflowRunResult }: CellSuccessProps<EditWorkflowRunResultById>) => {
  const [updateWorkflowRunResult, { loading, error }] = useMutation(UPDATE_WORKFLOW_RUN_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunResult updated')
      navigate(routes.workflowRunResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateWorkflowRunResult({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit WorkflowRunResult {workflowRunResult.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunResultForm workflowRunResult={workflowRunResult} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
