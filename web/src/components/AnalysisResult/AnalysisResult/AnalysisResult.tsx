import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_ANALYSIS_RESULT_MUTATION = gql`
  mutation DeleteAnalysisResultMutation($id: String!) {
    deleteAnalysisResult(id: $id) {
      id
    }
  }
`

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

const AnalysisResult = ({ analysisResult }) => {
  const [deleteAnalysisResult] = useMutation(DELETE_ANALYSIS_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('AnalysisResult deleted')
      navigate(routes.analysisResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete analysisResult ' + id + '?')) {
      deleteAnalysisResult({ variables: { id } })
    }
  }

  console.log('aa', analysisResult)

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            AnalysisResult {analysisResult.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{analysisResult.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(analysisResult.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(analysisResult.updatedAt)}</td>
            </tr>
            <tr>
              <th>Ref</th>
              <td>{analysisResult.ref}</td>
            </tr>
            <tr>
              <th>Source</th>
              <td>{analysisResult.source}</td>
            </tr>
            <tr>
              <th>Raw json</th>
              <td>{jsonDisplay(analysisResult.rawJson)}</td>
            </tr>
            <tr>
              <th>Schema version</th>
              <td>{analysisResult.schemaVersion}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAnalysisResult({ id: analysisResult.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(analysisResult.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default AnalysisResult
