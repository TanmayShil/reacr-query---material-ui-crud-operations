import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Stack,
  InputLabel
} from "@mui/material";
import { useCreateProduct } from "../hooks/react-query/useProduct";
import Input from "../components/Input";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddProduct = () => {
  const navigate = useNavigate();
  const addProductMutation = useCreateProduct();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await addProductMutation.mutateAsync(data);
      if (response?.status === 200) {
        toast.success(response?.message);
        reset();
        setPreviewImage(null);
        navigate("/admin/products");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Box sx={{}}>
      <ToastContainer />
      <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "bold", color: "black", marginBottom: "20px" }}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Stack spacing={2} sx={{ width: "50%" }}>
          <Input name="title" label="Title" control={control} errors={errors} />
          <Input name="description" label="Description" control={control} errors={errors} />
          <Box>
            <InputLabel sx={{ mb: 1, color: "black" }}>Product Image</InputLabel>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      height: "250px",
                      alignContent: "center",
                      borderRadius: 2,
                      p: 2,
                      textAlign: "center",
                      cursor: "pointer",
                      bgcolor: "#f9f9f9",
                      '&:hover': { bgcolor: "#f1f1f1" },
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setValue("image", file, { shouldValidate: true });
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                    />

                    {!previewImage ? (
                      <Typography variant="body2" color="textSecondary">
                        Click or drag an image to upload
                      </Typography>
                    ) : (
                      <Box>
                        <img
                          src={previewImage}
                          alt="Uploaded Preview"
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "contain",
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  {errors.image && (
                    <Typography color="error" mt={1}>
                      {errors.image.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProduct;
