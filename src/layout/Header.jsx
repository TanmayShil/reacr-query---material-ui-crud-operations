import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import { useUserDetails } from '../hooks/react-query/useAuth';

const baseImageUrl = import.meta.env.VITE_IMAGE_BASE_URL;

const Header = () => {
  const { data, isLoading, isError, error } = useUserDetails();

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6"></Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="body1" sx={{color: "#fff"}}>{data?.data?.first_name} {data?.data?.last_name}</Typography>
            <Typography variant="body2"  sx={{color: "#fff"}}>{data?.data?.email}</Typography>
          </Box>
          <Avatar alt={data?.data?.first_name} src={`${baseImageUrl}/uploads/user/profile_pic/${data?.data?.profile_pic}`} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
