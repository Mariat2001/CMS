import React from 'react';
import './Header.css'
import './../logo.css'
import welcomeImage from './logo2.png';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

const Header = ({ isSidebarCollapsed }) => {
  const headerStyle = {
    marginLeft: isSidebarCollapsed ? '0' : '0', // Adjust as needed
  };
  return (

    <div className="header" style={headerStyle}>

    <div className="logo">
       

      {/* <a id="nav-title" target="_blank">
      <img src={welcomeImage} alt="Welcome" style={{ width: '25%', marginTop: '15px' }} />
      </a> */}
     
     
    
  
    </div>
    <div className="menu">
      <ul>
        <li> <FontAwesomeIcon icon={faFacebook} size="2x"/></li>
        <li> <FontAwesomeIcon icon={faInstagram} size="2x"/></li>
        <li> <FontAwesomeIcon icon={faTwitter} size="2x" /></li>
        <li> <FontAwesomeIcon icon={faLinkedin} size="2x"/></li>
      
      </ul>
    </div>
  </div>
  );
};

export default Header;