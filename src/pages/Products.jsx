import React from 'react'
import { useProductList } from '../hooks/react-query/useProduct';

const Products = () => {
    const { data, isLoading, isError, error } = useProductList();

    // console.log("data---", data)
  return (
    <div>Products</div>
  )
}

export default Products