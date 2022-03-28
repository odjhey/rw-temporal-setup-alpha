import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowRunResultForm from 'src/components/WorkflowRunResult/WorkflowRunResultForm'

const CREATE_WORKFLOW_RUN_RESULT_MUTATION = gql`
  mutation CreateWorkflowRunResultMutation($input: CreateWorkflowRunResultInput!) {
    createWorkflowRunResult(input: $input) {
      id
    }
  }
`

const NewWorkflowRunResult = () => {
  const [createWorkflowRunResult, { loading, error }] = useMutation(CREATE_WORKFLOW_RUN_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunResult created')
      navigate(routes.workflowRunResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createWorkflowRunResult({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New WorkflowRunResult</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunResultForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorkflowRunResult
