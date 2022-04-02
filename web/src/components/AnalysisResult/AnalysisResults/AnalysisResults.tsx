import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/AnalysisResult/AnalysisResultsCell'

const DELETE_ANALYSIS_RESULT_MUTATION = gql`
  mutation DeleteAnalysisResultMutation($id: String!) {
    deleteAnalysisResult(id: $id) {
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

const AnalysisResultsList = ({ analysisResults }) => {
  const [deleteAnalysisResult] = useMutation(DELETE_ANALYSIS_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('AnalysisResult deleted')
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
    if (confirm('Are you sure you want to delete analysisResult ' + id + '?')) {
      deleteAnalysisResult({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Ref</th>
            <th>Source</th>
            <th>Raw json</th>
            <th>Schema version</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {analysisResults.map((analysisResult) => (
            <tr key={analysisResult.id}>
              <td>{truncate(analysisResult.id)}</td>
              <td>{timeTag(analysisResult.createdAt)}</td>
              <td>{timeTag(analysisResult.updatedAt)}</td>
              <td>{truncate(analysisResult.ref)}</td>
              <td>{truncate(analysisResult.source)}</td>
              <td>{jsonTruncate(analysisResult.rawJson)}</td>
              <td>{truncate(analysisResult.schemaVersion)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.analysisResult({ id: analysisResult.id })}
                    title={'Show analysisResult ' + analysisResult.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAnalysisResult({ id: analysisResult.id })}
                    title={'Edit analysisResult ' + analysisResult.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete analysisResult ' + analysisResult.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(analysisResult.id)}
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

export default AnalysisResultsList
