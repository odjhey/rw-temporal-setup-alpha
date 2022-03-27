import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_WORKFLOW_RUN_SOURCE_MUTATION = gql`
  mutation DeleteWorkflowRunSourceMutation($id: Int!) {
    deleteWorkflowRunSource(id: $id) {
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

const WorkflowRunSource = ({ workflowRunSource }) => {
  const [deleteWorkflowRunSource] = useMutation(DELETE_WORKFLOW_RUN_SOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunSource deleted')
      navigate(routes.workflowRunSources())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowRunSource ' + id + '?')) {
      deleteWorkflowRunSource({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">WorkflowRunSource {workflowRunSource.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{workflowRunSource.id}</td>
            </tr><tr>
              <th>Slug</th>
              <td>{workflowRunSource.slug}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorkflowRunSource({ id: workflowRunSource.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(workflowRunSource.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default WorkflowRunSource
