import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({ name, label, control, errors, type = "text", ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          InputProps={{
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
    />
  );
};

export default Input;
