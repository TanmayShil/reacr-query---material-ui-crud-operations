import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { endpoints } from '../../api/endpoint';

// export const useProductList = () => {
//   return useQuery({
//     queryKey: ['productList'],
//     queryFn: async () => {
//       const response = await axiosInstance.get(endpoints.cms.productList);
//       return response.data;
//     },
//   });
// };

export const useProductList = (page = 1, perpage = 10) => {
  return useQuery({
    queryKey: ['productList', page, perpage],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.cms.productList, {
        params: {
          page,
          perpage,
        },
      });
      return response.data;
    },
    keepPreviousData: true, // for smoother UX
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