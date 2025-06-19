import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Stack,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useCreateProduct,
  useUpdateProduct,
  useProductById,
} from "../hooks/react-query/useProduct";
import Input from "../components/Input";

// Validation Schema
const productSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  // image: Yup.mixed().required("Image is required"),
});


const AddProduct = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const { data: productData, isLoading } = useProductById(id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  //  edit mode
  useEffect(() => {
    if (isEditMode && productData) {
      const { title, description, image } = productData?.data || {};
      reset({ title, description, image: null });

      if (image) {
        const fullUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}/uploads/product/${image}`;
        setPreviewImage(fullUrl);
      }
    }
  }, [productData, isEditMode, reset]);

  // Form Submission
  const onSubmit = async (formData) => {
    try {
      const mutationFn = isEditMode ? updateProduct : createProduct;
      const payload = isEditMode ? { id, data: formData } : formData;

      const response = await mutationFn.mutateAsync(payload);

      if (response?.status === 200) {
        toast.success(response?.message || "Operation successful");
        reset();
        setPreviewImage(null);
        navigate("/admin/products");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    }
  };


  // Render
  if (isEditMode && isLoading) {
    return <Typography>Loading product details...</Typography>;
  }

  return (
    <Box>
      <ToastContainer />
      <Box sx={{
        display: "flex", alignItems: "center",
        mb: 2
      }}>
        <IconButton onClick={() => navigate("/admin/products")} sx={{ mr: 1 }}><ArrowBackIcon color="primary" fontSize="small" /></IconButton>
        <Typography variant="h4" fontWeight="bold">
          {isEditMode ? "Edit Product" : "Add Product"}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Stack spacing={2} width="100%" maxWidth={500}>
          <Input name="title" label="Title" control={control} errors={errors} />
          <Input name="description" label="Description" control={control} errors={errors} />

          <Box>
            <InputLabel sx={{ mb: 1 }}>Product Image</InputLabel>

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      height: 250,
                      p: 2,
                      borderRadius: 2,
                      textAlign: "center",
                      bgcolor: "#f9f9f9",
                      cursor: "pointer",
                      '&:hover': { bgcolor: "#f1f1f1" },
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue("image", file, { shouldValidate: true });
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {!previewImage ? (
                      <Typography color="textSecondary">
                        Click or drag an image to upload
                      </Typography>
                    ) : (
                      <Box>
                        <img
                          src={previewImage}
                          alt="Product Preview"
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
            {isEditMode ? "Update Product" : "Add Product"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProduct;
