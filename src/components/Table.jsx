import { TableContainer,Table,TableHead,  TableCell, TableRow,TableBody,styled, tableCellClasses, TextField, Divider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f7f7f7",
        fontWeight: 600,
        zIndex: 1
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    
}));

const StyledTableRow = styled(TableRow)(() => ({
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const CustomTable = ({rows,columns,height,width}) => {
    return (
        <>
            <TableContainer sx={{ border: "1px solid #e3e3e3",height,width, borderRadius: "2px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((column,index) =>( 
                                    <StyledTableCell 
                                    key={index}
                                    align={column.align}
                                    style={{ whiteSpace: "nowrap", minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    
                                    <br/>
                                        {
                                            column.type === "date" ? 
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={['SingleInputDateRangeField']}>
        <DateRangePicker 
        
        onChange={(newDate) =>
          column.handleChange({
            target: { name: column.id, value: newDate },
          })
        }
        slots={{ field: SingleInputDateRangeField }}
        slotProps={{textField:{size:"small"}}}
         />
      </DemoContainer>
    </LocalizationProvider> 
                                             
                                            :
                                            <TextField
                                            variant="outlined"
                                            name={column.id} // name
                                            onChange={column.handleChange}
                                            placeholder="filter..."
                                            size="small"
                                            
                                            // sx={{ height: '50%' }}
                                        />
                                        }
                                    </StyledTableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row,index) => (
                                <StyledTableRow key={index}  role="checkbox" tabIndex={-1}>
                                    {
                                        columns.map((column,index) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={index}>
                                                {value}
                                            </TableCell>
                                            )
                                        })
                                    }
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CustomTable;