import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button
} from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteProduct, useProductList } from '../hooks/react-query/useProduct';
import TableComponent from '../components/Table';


const Products = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const perPage = 5;

  const { data, isLoading, isError, error } = useProductList(page, perPage);
  const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct();

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    deleteProduct(id, {
      onSuccess: (response) => {
        toast.success(response?.message || "Product deleted successfully");
        queryClient.invalidateQueries(['productList']);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to delete product");
      }
    });
  };

  const handleAdd = () => navigate("/admin/product/add");
  const handleEdit = (id) => navigate(`/admin/product/add/${id}`);

  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "title", headerName: "Title" },
    { field: "description", headerName: "Description" },
    { field: "status", headerName: "Status" }
  ];

  const renderActions = (row) => (
    <>
      <Edit
        color="primary"
        style={{ cursor: 'pointer', marginRight: 8 }}
        onClick={() => handleEdit(row._id)}
      />
      <Delete
        color="error"
        style={{ cursor: isDeleting ? 'not-allowed' : 'pointer' }}
        onClick={() => handleDelete(row._id)}
      />
    </>
  );


  if (isLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <ToastContainer />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Product List</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Product
        </Button>
      </Box>
        <TableComponent
        columns={columns}
        rows={products}
        actions={renderActions}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
        loading={isDeleting}
      />
    </Box>
  );
};

export default Products;
