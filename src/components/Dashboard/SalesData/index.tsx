import { useState, useMemo } from 'react';
import {
  Card,
  Box,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableSortLabel,
  TableRow,
  TablePagination,
  CardContent,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from '~/redux/store';
import { getSales, getPastSales } from '~/redux/reducers/dashboardSlice';
import { stableSort, getComparator } from '~/helpers';
import { NumericFormat } from 'react-number-format';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'make', label: 'Make' },
  { id: 'model', label: 'Model' },
  { id: 'year', label: 'Year' },
  { id: 'soldPrice', label: 'Sold Price' },
];

const SalesData = () => {
  const salesData = useAppSelector(getSales);
  const pastSalesData = useAppSelector(getPastSales);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentData, setCurrentData] = useState<boolean>(true);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnChangeCurrentData = () => {
    setCurrentData((prev) => !prev);
  };

  const emptyRows =
    pastSalesData && page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - pastSalesData.length)
      : 0;

  const visibleRows = useMemo(() => {
    if (pastSalesData && salesData) {
      return stableSort(
        currentData ? salesData : pastSalesData,
        getComparator(order, orderBy),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    return [];
  }, [
    order,
    orderBy,
    page,
    rowsPerPage,
    pastSalesData,
    salesData,
    currentData,
  ]);

  return (
    <Card>
      <CardContent>
        <Toolbar
          sx={{
            p: 0,
            width: '100%',
            height: 30,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {currentData ? 'Sales Data' : 'Past Sales Data'}
          </Typography>
          <Button
            size="small"
            color="info"
            variant="outlined"
            onClick={handleOnChangeCurrentData}
            sx={{ minWidth: 75 }}
          >
            {currentData ? 'Current' : 'Past'}
          </Button>
        </Toolbar>
        <TableContainer>
          <Table stickyHeader sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {headCells.map((cell, index) => (
                  <TableCell
                    key={`${cell.id}-head-cell`}
                    align="left"
                    padding={index === 0 ? 'none' : 'normal'}
                    sortDirection={orderBy === cell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, cell.id)}
                    >
                      {cell.label}
                      {orderBy === cell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  key={`dashboard-sales-row-${index}`}
                  role="link"
                  tabIndex={-1}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell
                    component="th"
                    id={row.name}
                    scope="row"
                    padding="none"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.make}</TableCell>
                  <TableCell align="left">{row.model}</TableCell>
                  <TableCell align="left">{row.year}</TableCell>
                  <TableCell align="left">
                    <NumericFormat
                      displayType="text"
                      value={row.soldPrice}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp "
                    />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {visibleRows.length === 0 && (
          <Box
            sx={{
              minHeight: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              component="p"
              textAlign="center"
            >
              No Data Found
            </Typography>
          </Box>
        )}
        <Divider />
        {pastSalesData && salesData && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={currentData ? salesData.length : pastSalesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SalesData;
