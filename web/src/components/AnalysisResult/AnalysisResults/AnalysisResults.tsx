import { Table } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
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

const AnalysisResultsList = ({ analysisResults }) => {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Source</th>
          <th>Schema version</th>
          <th>Created at</th>
          <th>Id</th>
          <th>Updated at</th>
          <th>Ref</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {analysisResults.map((analysisResult) => (
          <tr key={analysisResult.id}>
            <td>{truncate(analysisResult.source)}</td>
            <td>{truncate(analysisResult.schemaVersion)}</td>
            <td>{timeTag(analysisResult.createdAt)}</td>
            <td>{truncate(analysisResult.id)}</td>
            <td>{timeTag(analysisResult.updatedAt)}</td>
            <td>{truncate(analysisResult.ref)}</td>
            <td>
              <nav className="rw-table-actions">
                <Link
                  to={routes.analysisResult({ id: analysisResult.id })}
                  title={'Show analysisResult ' + analysisResult.id + ' detail'}
                  className="rw-button rw-button-small"
                >
                  Show
                </Link>
              </nav>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default AnalysisResultsList
