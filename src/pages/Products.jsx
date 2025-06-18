import { useState } from 'react'
import { useDeleteProduct, useProductList } from '../hooks/react-query/useProduct';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Pagination,
  Button
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from '@tanstack/react-query';

const Products = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { data, isLoading, isError, error } = useProductList(page, perPage);
  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id, {
        onSuccess: (response) => {
          toast.success(response?.message);
          queryClient.invalidateQueries(['productList']);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
        }
      });
    }
  };

  if (isLoading) return <Box p={4}><CircularProgress /></Box>;
  if (isError) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box p={4}>
      <ToastContainer />
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
        <Typography variant="h3">Product List</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/admin/product/add")}>Add Product</Button>
      </Box>
      {products?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell align="center">
                      <Edit
                        style={{ cursor: 'pointer', marginRight: 8 }}
                        onClick={() => navigate(`/admin/product/add/${product._id}`)}
                        color="primary"
                      />
                      <Delete
                        style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
                        onClick={() => handleDelete(product._id)}
                        color="error"
                        disabled={isDeleting}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography>No products found.</Typography>
      )}
    </Box>
  )
}

export default Products