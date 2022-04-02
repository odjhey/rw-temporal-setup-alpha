import { useMemo } from 'react'
import { createTable, useTable } from '@tanstack/react-table'
import { Table, ScrollArea, Title, Group } from '@mantine/core'

const table = createTable()

const SampleDataTable = ({ columns, sample }) => {
  const tableColumns = useMemo(() => {
    return table.createColumns(
      columns.map((col: string) => {
        return table.createDataColumn(col, {})
      })
    )
  }, [columns])

  const instance = useTable(table, {
    data: sample,
    columns: tableColumns,
  })

  return (
    <Group sx={{ maxWidth: '100vw' }}>
      <Title order={2}>Random Sample</Title>
      <ScrollArea>
        <Table
          highlightOnHover
          striped
          my={'xs'}
          fontSize={'xs'}
          verticalSpacing={'xs'}
          horizontalSpacing={'xs'}
          {...instance.getTableProps()}
        >
          <thead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th {...header.getHeaderProps()}>
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...instance.getTableBodyProps()}>
            {instance.getRowModel().rows.map((row) => (
              <tr {...row.getRowProps()}>
                {row.getVisibleCells().map((cell) => (
                  <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {instance.getFooterGroups().map((footerGroup) => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map((header) => (
                  <th {...header.getFooterProps()}>
                    {header.isPlaceholder ? null : header.renderFooter()}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </Table>
      </ScrollArea>
    </Group>
  )
}

export default SampleDataTable
