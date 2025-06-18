import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';

const sidebarItems = [
  { path: '/admin/products', name: 'Products', icon: <Inventory2Icon /> },
  // { path: '/admin/profile', name: 'Profile', icon: <PersonIcon /> }
];

const SideBar = () => {
  const location = useLocation();

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: '#1976d2', paddingTop: 8 }}>
      <List sx={{}}>
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
             button="true"
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: '#fff',
                bgcolor: isActive ? '#1565c0' : 'transparent',
                '&:hover': {
                  bgcolor: '#1565c0'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} primaryTypographyProps={{ style: { color: '#fff' } }}/>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
