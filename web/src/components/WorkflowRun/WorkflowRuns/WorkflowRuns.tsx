import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/WorkflowRun/WorkflowRunsCell'

const DELETE_WORKFLOW_RUN_MUTATION = gql`
  mutation DeleteWorkflowRunMutation($id: Int!) {
    deleteWorkflowRun(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const WorkflowRunsList = ({ workflowRuns }) => {
  const [deleteWorkflowRun] = useMutation(DELETE_WORKFLOW_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRun deleted')
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
    if (confirm('Are you sure you want to delete workflowRun ' + id + '?')) {
      deleteWorkflowRun({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Temporal workflow id</th>
            <th>File Input</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workflowRuns.map((workflowRun) => (
            <tr key={workflowRun.id}>
              <td>{truncate(workflowRun.id)}</td>
              <td>{truncate(workflowRun.temporalWorkflowId)}</td>
              <td>{truncate(workflowRun.fileInput)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.workflowRun({ id: workflowRun.id })}
                    title={'Show workflowRun ' + workflowRun.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWorkflowRun({ id: workflowRun.id })}
                    title={'Edit workflowRun ' + workflowRun.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete workflowRun ' + workflowRun.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workflowRun.id)}
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

export default WorkflowRunsList
