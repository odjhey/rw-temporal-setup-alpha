import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/WorkflowRunSource/WorkflowRunSourcesCell'

const DELETE_WORKFLOW_RUN_SOURCE_MUTATION = gql`
  mutation DeleteWorkflowRunSourceMutation($id: Int!) {
    deleteWorkflowRunSource(id: $id) {
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

const WorkflowRunSourcesList = ({ workflowRunSources }) => {
  const [deleteWorkflowRunSource] = useMutation(DELETE_WORKFLOW_RUN_SOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('WorkflowRunSource deleted')
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
    if (confirm('Are you sure you want to delete workflowRunSource ' + id + '?')) {
      deleteWorkflowRunSource({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Slug</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {workflowRunSources.map((workflowRunSource) => (
            <tr key={workflowRunSource.id}>
              <td>{truncate(workflowRunSource.id)}</td>
              <td>{truncate(workflowRunSource.slug)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.workflowRunSource({ id: workflowRunSource.id })}
                    title={'Show workflowRunSource ' + workflowRunSource.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWorkflowRunSource({ id: workflowRunSource.id })}
                    title={'Edit workflowRunSource ' + workflowRunSource.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete workflowRunSource ' + workflowRunSource.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(workflowRunSource.id)}
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

export default WorkflowRunSourcesList
