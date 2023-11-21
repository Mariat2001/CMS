import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';



import  './Menubar.css'

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";



import "react-pro-sidebar/dist/css/styles.css";


const Sidebar = ({ setEmail, userName }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
<div className='bar' >
<Box className="sidebar-box"> 
      <ProSidebar collapsed={isCollapsed} style={{ width:'100px',height: '700px' ,backgroundColor:'#18283b'}}>
     <Menu>
         
        
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            className="menu-item"
            backgroundColor="#000"
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
       
          <MenuItem>
          <div className="nav-button">
            <Link to="/HomeDashboards" className="menu-link">
              <span className="menu-icon" role="img" aria-label="Stream">
              <HomeIcon />
              </span>
              <span
                className={`menu-label ${
                  isCollapsed ? "collapsed" : "white-text"
                }`}
              >
                Home
              </span>
            </Link>
            </div>
          </MenuItem>

          <MenuItem>
          <div className="nav-button">
            <Link to="/Productindex" className="menu-link">
              <span className="menu-icon" role="img" aria-label="Stream">
              <FontAwesomeIcon icon={faBoxOpen}  />
              </span>
              <span
                className={`menu-label ${
                  isCollapsed ? "collapsed" : "white-text"
                }`}
              >
                Products
              </span>
            </Link>
            </div>
          </MenuItem>

          <MenuItem>
          <div className="nav-button">
            <Link to="/UserTable" className="menu-link">
              <span className="menu-icon" role="img" aria-label="Stream">
              <FontAwesomeIcon icon={faUser}  />
              </span>
              <span
                className={`menu-label ${
                  isCollapsed ? "collapsed" : "white-text"
                }`}
              >
                User
              </span>
            </Link>
            </div>
          </MenuItem>

          <MenuItem>
          <div className="nav-button">
            <Link to="/Calendar" className="menu-link">
              <span className="menu-icon" role="img" aria-label="Stream">
              <FontAwesomeIcon icon={faCalendar}  />
              </span>
              <span
                className={`menu-label ${
                  isCollapsed ? "collapsed" : "white-text"
                }`}
              >
                Calendar
              </span>
            </Link>
            </div>
          </MenuItem>

         

          
          <hr/>
          <MenuItem>
        
      
       
      <div id="nav-footer-titlebox" style={{ display: 'flex', alignItems: 'center', width: '200px', marginLeft:'20px'}}>
      <button onClick={handleClick} className="btn btn-danger custom-button" style={{ flex: 1, marginRight:'50px' }}>
        Logout
      </button>
     
       
       
       
        <label for="nav-footer-toggle">
        
        </label>
    
      <div id="nav-footer-content">
       
      </div>
    </div>
          </MenuItem>

        </Menu>
      </ProSidebar>
    
    </Box>
</div>

   
  )
}

export default Sidebar
