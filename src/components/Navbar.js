import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../images/Logo.svg'

const Navbar = () => (
  <AppBar position="static" style={{backgroundColor: '#7a8594', marginBottom:'20px'}}>
    <Toolbar> 
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={Logo} alt="Logo" style={{ height: '60px' }} />
        </NavLink>
      </Typography>
      <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>Dashboard</NavLink>
      <NavLink to="/transactions" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>Transactions</NavLink>
      <NavLink to="/add" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>Add</NavLink>
      <NavLink to="/groups" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>Groups</NavLink>
      <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>Profile</NavLink>
      <IconButton color="inherit">
        <NotificationsIcon />
      </IconButton>
      <Button color="inherit">Logout</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;