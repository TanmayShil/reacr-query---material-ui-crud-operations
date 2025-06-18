import { useState } from 'react'
import { useProductList } from '../hooks/react-query/useProduct';
import {
  Box,
  Typography,
  CircularProgress
} from "@mui/material";

const Products = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError, error } = useProductList(page, perPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <Box p={4}><CircularProgress /></Box>;
  if (isError) return <Typography>Error: {error.message}</Typography>;

  console.log("data----", data);


  return (
    <div>Products</div>
  )
}

export default Products