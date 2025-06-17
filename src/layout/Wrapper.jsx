import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

const Wrapper = () => {
   const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    console.log("token", token)
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  return (
    <Box display="flex" height="100vh">
      <Box width="20%" bgcolor="#f4f4f4">
        <SideBar />
      </Box>
      <Box width="80%" display="flex" flexDirection="column">
        <Header />
        <Box flex={1} p={2} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Wrapper);
