import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import { useUserDetails } from '../hooks/react-query/useAuth';

const Header = () => {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    // image: 'https://i.pravatar.cc/300' 
  };

  const { data, isLoading, isError, error } = useUserDetails();

    console.log("user data---", data)

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6"></Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box textAlign="right">
            <Typography variant="body1" sx={{color: "#fff"}}>{profile.name}</Typography>
            <Typography variant="body2"  sx={{color: "#fff"}}>{profile.email}</Typography>
          </Box>
          <Avatar alt={profile.name} src={profile.image} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
