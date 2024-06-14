import { useState, useMemo, useCallback } from 'react';
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
  Link,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useAppSelector } from '~/redux/store';
import { getSales, getPastSales } from '~/redux/reducers/dashboardSlice';
import { stableSort, getComparator } from '~/helpers';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns/format';

const headCells = [
  { id: 'dateSold', label: 'Date Sold' },
  { id: 'name', label: 'Name' },
  { id: 'make', label: 'Make' },
  { id: 'model', label: 'Model' },
  { id: 'year', label: 'Year' },
  { id: 'soldPrice', label: 'Sold Price' },
];

const SalesData = () => {
  const salesData = useAppSelector(getSales);
  const pastSalesData = useAppSelector(getPastSales);
  const [orderBy, setOrderBy] = useState<string>('dateSold');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentData, setCurrentData] = useState<boolean>(true);

  const handleRequestSort = useCallback(
    (_event: React.MouseEvent<unknown>, property: string) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  const handleOnChangeCurrentData = useCallback(() => {
    setCurrentData((prev) => !prev);
  }, []);

  const emptyRows = useMemo(() => {
    return currentData
      ? salesData && page > 0
        ? Math.max(0, 1 * page * rowsPerPage - salesData.length)
        : 0
      : pastSalesData && page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - pastSalesData.length)
      : 0;
  }, [currentData, pastSalesData, salesData, page, rowsPerPage]);

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
    <Card sx={{ bgcolor: 'primary.light' }}>
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
          <Typography variant="body1" color="secondary" fontWeight="bold">
            {currentData ? 'Sales Data' : 'Past Sales Data'}
          </Typography>
          <Button
            size="small"
            color="secondary"
            variant="outlined"
            onClick={handleOnChangeCurrentData}
            sx={{ minWidth: 125 }}
          >
            {currentData ? 'See Past Data' : 'See Current Data'}
          </Button>
        </Toolbar>
        <TableContainer component="div">
          <Table component="div" sx={{ minWidth: 750 }}>
            <TableHead component="div">
              <TableRow component="div">
                {headCells.map((cell, index) => (
                  <TableCell
                    component="div"
                    key={`${cell.id}-head-cell`}
                    align={index === headCells.length - 1 ? 'right' : 'left'}
                    padding={'normal'}
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
            <TableBody component={'div'}>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  key={`dashboard-sales-row-${index}`}
                  role="link"
                  component={Link}
                  href={`/vehicle/${row._id}`}
                  tabIndex={-1}
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <TableCell component="div" scope="row">
                    {row.dateSold &&
                      format(new Date(row.dateSold), 'dd MMM yyyy')}
                  </TableCell>
                  <TableCell component="div" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell component="div" align="left">
                    {row.make}
                  </TableCell>
                  <TableCell component="div" align="left">
                    {row.model}
                  </TableCell>
                  <TableCell component="div" align="left">
                    {row.year}
                  </TableCell>
                  <TableCell component="div" align="right">
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
                  component="div"
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell component="div" colSpan={6} />
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
            <Typography variant="body2" component="p" textAlign="center">
              No data to display
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
