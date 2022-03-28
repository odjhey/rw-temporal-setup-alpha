import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WORKFLOW_RUN_MUTATION = gql`
  mutation DeleteWorkflowRunMutation($id: Int!) {
    deleteWorkflowRun(id: $id) {
      id
    }
  }
`

const UNBLOCK_WORKFLOW_RUN_MUTATION = gql`
  mutation UnblockWorkflowRunMutation($id: Int!) {
    unblock(id: $id) {
      id
    }
  }
`

const WorkflowRun = ({ workflowRun }) => {
  const [deleteWorkflowRun] = useMutation(DELETE_WORKFLOW_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRun deleted')
      navigate(routes.workflowRuns())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [unblockWorkflowRun] = useMutation(UNBLOCK_WORKFLOW_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRun unblocked')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowRun ' + id + '?')) {
      deleteWorkflowRun({ variables: { id } })
    }
  }
  const onUnblockClick = (id) => {
    if (confirm('Are you sure you want to UNBLOCK workflowRun ' + id + '?')) {
      unblockWorkflowRun({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            WorkflowRun {workflowRun.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workflowRun.id}</td>
            </tr>
            <tr>
              <th>Temporal workflow id</th>
              <td>{workflowRun.temporalWorkflowId}</td>
            </tr>
            <tr>
              <th>Temporal Status</th>
              <td>{workflowRun.temporalStatus}</td>
            </tr>
            <tr>
              <th>Result Id</th>
              <td>
                <Link
                  to={routes.workflowRunResult({ id: workflowRun.resultId })}
                >
                  {workflowRun.resultId}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-green"
          onClick={() => onUnblockClick(workflowRun.id)}
        >
          Unblock
        </button>

        <Link
          to={routes.editWorkflowRun({ id: workflowRun.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workflowRun.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default WorkflowRun
