import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowRunForm from 'src/components/WorkflowRun/WorkflowRunForm'

const CREATE_WORKFLOW_RUN_MUTATION = gql`
  mutation CreateWorkflowRunMutation($input: CreateWorkflowRunInput!) {
    createWorkflowRun(input: $input) {
      id
    }
  }
`

const NewWorkflowRun = () => {
  const [createWorkflowRun, { loading, error }] = useMutation(CREATE_WORKFLOW_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRun created')
      navigate(routes.workflowRuns())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createWorkflowRun({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New WorkflowRun</h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorkflowRun
