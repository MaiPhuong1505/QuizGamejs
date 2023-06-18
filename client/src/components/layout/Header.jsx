import { AppBar, Box, Button, Typography } from '@mui/material';
import MyLogo from '../../assets/logo192.png';
import './Layout.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';

// import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  return (
    <AppBar
      position="fixed"
      sx={{
        flexDirection: 'inherit',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 0px 3px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <div className="container">
        <img src={MyLogo} style={{ width: 60 }} alt="Logo" />
        {/* <Link to="/"> */}
        <Typography color="primary" className="brand">
          QuizGame
        </Typography>
        {/* </Link> */}
      </div>
      <nav>
        <ul className="nav__links">
          <li>How to play</li>
          <li>
            {/* <NavLink to="/downloadLink" style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                }> */}
            New templates
            {/* </NavLink> */}
          </li>
          {/* {isLogin ?
                <li>
                    <NavLink exact="true" to="/store"
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    > <Storefront sx={{ color: secondColor }} /> Cửa hàng của bạn
                    </NavLink>
                </li>
                :
                <li>
                    <NavLink exact="true" to="/introduction"
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    > <Group sx={{ color: secondColor }} /> Đăng ký bán hàng
                    </NavLink>
                </li>
            } */}
        </ul>
      </nav>
      {/* {isLogin ?
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography color='black'>{userName}</Typography>
            <Button style={{ marginLeft: 10 }} onClick={logout}>Đăng xuất</Button></div>
        : <Link to="/login" className='login-button'>Đăng nhập</Link>} */}
      {user.token ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'black' }}>Hi, {user.user.username}</Typography>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Box>
      ) : (
        <>
          <Box sx={{ '& button': { mr: 3 } }}>
            <Button variant="contained">Sign Up</Button>
            <Button variant="outlined">Play</Button>
          </Box>
        </>
      )}
    </AppBar>
  );
};

export default Header;
