import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { endpoints } from '../../api/endpoint';


export const useProductList = (page = 1, perpage = 5) => {
  return useQuery({
    queryKey: ['productList', page, perpage],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cms.productList, {
        page,
        perpage
      });
      return response.data;
    },
    keepPreviousData: true, // for smoother UX
  });
}; 

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['productById', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`${endpoints.cms.productDetails}/${id}`);
      return response.data;
    },
    enabled: !!id, // only run if id is provided
  });
};

export const useCreateProduct = () => {
    return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image);
      
      const response = await axiosInstance.post(endpoints.cms.productCreate, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await axiosInstance.post(`${endpoints.cms.productUpdate}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    }
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(endpoints.cms.productRemove, {
        id,
      });
      return response.data;
    },
  });
};
