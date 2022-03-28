import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WORKFLOW_RUN_RESULT_MUTATION = gql`
  mutation DeleteWorkflowRunResultMutation($id: Int!) {
    deleteWorkflowRunResult(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const WorkflowRunResult = ({ workflowRunResult }) => {
  const [deleteWorkflowRunResult] = useMutation(DELETE_WORKFLOW_RUN_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunResult deleted')
      navigate(routes.workflowRunResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowRunResult ' + id + '?')) {
      deleteWorkflowRunResult({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">WorkflowRunResult {workflowRunResult.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workflowRunResult.id}</td>
            </tr><tr>
              <th>Temporal workflow id</th>
              <td>{workflowRunResult.temporalWorkflowId}</td>
            </tr><tr>
              <th>Result</th>
              <td>{jsonDisplay(workflowRunResult.result)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorkflowRunResult({ id: workflowRunResult.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workflowRunResult.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default WorkflowRunResult
