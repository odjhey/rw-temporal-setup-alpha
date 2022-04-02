/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Table, Title } from '@mantine/core'
import { createTable, useTable } from '@tanstack/react-table'

const table = createTable()
const tableColumns = table.createColumns([
  // @ts-ignore
  table.createDataColumn('column', {}),
  // @ts-ignore
  table.createDataColumn('unique', {}),
  // @ts-ignore
  table.createDataColumn('dataType', {}),
])

const ColumnsSummaryDataTable = ({ data }) => {
  const instance = useTable(table, {
    data: data,
    columns: tableColumns,
  })

  return (
    <>
      <Title order={2}>Column Summary</Title>
      <Table
        highlightOnHover
        striped
        my={'xs'}
        verticalSpacing={'xs'}
        horizontalSpacing={'xs'}
        {...instance.getTableProps()}
      >
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} {...header.getHeaderProps()}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...instance.getTableBodyProps()}>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} {...row.getRowProps()}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} {...cell.getCellProps()}>
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} {...header.getFooterProps()}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </>
  )
}

export default ColumnsSummaryDataTable
