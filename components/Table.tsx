import React from "react"
import { 
  useTable,
  Column,
} from "react-table"
import { 
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

export interface TableProps {
  columns: Column<object>[]
  data: object[]
}

export const Table = ({columns, data}: TableProps ): JSX.Element =>  {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <ChakraTable {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(col => (
              <Th {...col.getHeaderProps()}>
                {col.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <Tr>
              {row.cells.map(cell => {
                <Td {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </Td>
              })}
            </Tr>
          )
        })}
      </Tbody>
    </ChakraTable>
  )
}
