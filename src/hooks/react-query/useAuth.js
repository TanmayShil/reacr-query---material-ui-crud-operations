import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import { endpoints } from '../../api/endpoint';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profile_pic", data.profile_pic);
      
      const response = await axiosInstance.post(endpoints.auth.signup, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(endpoints.auth.login, data);
      return response.data;
    }
  });
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.auth.profileDetails);
      return response.data;
    },
  });
};
