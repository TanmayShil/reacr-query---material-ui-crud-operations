import { AppBar, Toolbar, Typography, Avatar, Box, Tooltip, IconButton } from '@mui/material';
import { useUserDetails } from '../hooks/react-query/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const baseImageUrl = import.meta.env.VITE_IMAGE_BASE_URL;

const Header = () => {
  const { data } = useUserDetails();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };


  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6"></Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="body1" sx={{ color: "#fff" }}>{data?.data?.first_name} {data?.data?.last_name}</Typography>
            <Typography variant="body2" sx={{ color: "#fff" }}>{data?.data?.email}</Typography>
          </Box>
          <Avatar alt={data?.data?.first_name} src={`${baseImageUrl}/uploads/user/profile_pic/${data?.data?.profile_pic}`} />
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} sx={{ color: '#fff' }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
