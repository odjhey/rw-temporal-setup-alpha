import { Group, Table, Title } from '@mantine/core'
import ColumnsSummaryDataTable from './ColumnsSummaryDataTable'
import SampleDataTable from './SampleDataTable'

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
  // TODO: check schema version first
  const { sample, columns, columnsSummary, ...rest } = analysisResult.rawJson
  console.log(rest)
  return (
    <>
      <header>
        <Title order={1}>AnalysisResult {analysisResult.id} Detail</Title>
      </header>
      <Group py={'xl'}>
        <Table highlightOnHover striped>
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
              <td>{jsonDisplay(rest)}</td>
            </tr>
            <tr>
              <th>Schema version</th>
              <td>{analysisResult.schemaVersion}</td>
            </tr>
          </tbody>
        </Table>
        <ColumnsSummaryDataTable data={columnsSummary} />
        <SampleDataTable columns={columns} sample={sample} />
      </Group>
    </>
  )
}

export default AnalysisResult
