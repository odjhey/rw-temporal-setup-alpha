import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/WorkflowRunResult/WorkflowRunResultsCell'

const DELETE_WORKFLOW_RUN_RESULT_MUTATION = gql`
  mutation DeleteWorkflowRunResultMutation($id: Int!) {
    deleteWorkflowRunResult(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const WorkflowRunResultsList = ({ workflowRunResults }) => {
  const [deleteWorkflowRunResult] = useMutation(DELETE_WORKFLOW_RUN_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunResult deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete workflowRunResult ' + id + '?')) {
      deleteWorkflowRunResult({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Temporal workflow id</th>
            <th>Result</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workflowRunResults.map((workflowRunResult) => (
            <tr key={workflowRunResult.id}>
              <td>{truncate(workflowRunResult.id)}</td>
              <td>{truncate(workflowRunResult.temporalWorkflowId)}</td>
              <td>{jsonTruncate(workflowRunResult.result)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.workflowRunResult({ id: workflowRunResult.id })}
                    title={'Show workflowRunResult ' + workflowRunResult.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWorkflowRunResult({ id: workflowRunResult.id })}
                    title={'Edit workflowRunResult ' + workflowRunResult.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete workflowRunResult ' + workflowRunResult.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workflowRunResult.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WorkflowRunResultsList
