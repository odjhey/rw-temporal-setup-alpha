import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import WorkflowRunSourceForm from 'src/components/WorkflowRunSource/WorkflowRunSourceForm'

const CREATE_WORKFLOW_RUN_SOURCE_MUTATION = gql`
  mutation CreateWorkflowRunSourceMutation(
    $input: CreateWorkflowRunSourceInput!
  ) {
    createWorkflowRunSource(input: $input) {
      id
    }
  }
`

const FIND_FILE_SOURCES = gql`
  query FindFileSources {
    fileSources {
      slug
    }
  }
`

const NewWorkflowRunSource = () => {
  const [createWorkflowRunSource, { loading, error }] = useMutation(
    CREATE_WORKFLOW_RUN_SOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('WorkflowRunSource created')
        navigate(routes.workflowRunSources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const { data: fileSources, loading: _loading } = useQuery(FIND_FILE_SOURCES)

  console.log('filesources', fileSources)

  const onSave = (input) => {
    createWorkflowRunSource({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New WorkflowRunSource
        </h2>
      </header>
      <div className="rw-segment-main">
        <WorkflowRunSourceForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewWorkflowRunSource
