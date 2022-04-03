import { Button, Collapse, Group, Table, Title } from '@mantine/core'
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
        <Title order={1}>Analysis Result: {analysisResult.source}</Title>
      </header>
      <Group py={'xl'}>
        <Table highlightOnHover striped>
          <tbody>
            <tr>
              <th>Source</th>
              <td>{analysisResult.source}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(analysisResult.createdAt)}</td>
            </tr>
            <tr>
              <th>Ref</th>
              <td>{analysisResult.ref}</td>
            </tr>
            <tr>
              <th>Schema version</th>
              <td>{analysisResult.schemaVersion}</td>
            </tr>
            <tr>
              <th>Id</th>
              <td>{analysisResult.id}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(analysisResult.updatedAt)}</td>
            </tr>
            <tr>
              <th>Other Data</th>
              <td>
                <Collapsable>{jsonDisplay(rest)}</Collapsable>
              </td>
            </tr>
          </tbody>
        </Table>
        <ColumnsSummaryDataTable data={columnsSummary} />
        <SampleDataTable columns={columns} sample={sample} />
      </Group>
    </>
  )
}
function Collapsable({ children }) {
  const [opened, setOpen] = React.useState(false)

  return (
    <>
      <Button variant="subtle" size="xs" onClick={() => setOpen((o) => !o)}>
        Details
      </Button>

      <Collapse in={opened}>{children}</Collapse>
    </>
  )
}

export default AnalysisResult
