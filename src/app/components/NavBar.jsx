
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { logOut } from '../authenticationSlice';
import { FaChartBar, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { GiTakeMyMoney } from "react-icons/gi";

export default function NavBar() {
  const { isLoggedIn } = useSelector((state) => state.authenticationSlice);
  const dispatch = useDispatch();
  return (
    <Nav className="navbar" style={{ backgroundColor: '#3498db', padding: '20px 30px', color: '#fff', borderBottom: '2px solid #2980b9', marginBottom:'4rem' }}>
       <NavLink className="nav-link" to="/" style={{ color: '#fff', marginRight: '15px' }}>
        <GiTakeMyMoney style={{ fontSize: '2.5rem', marginRight: '10px' }} />
        </NavLink>
      {isLoggedIn ? (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <NavLink className="nav-link" to="/statistics" style={{ color: '#fff', marginRight: '15px', fontSize:'0.9rem'}}>
            <FaChartBar style={{ marginRight: '5px' }} />
            statistics
          </NavLink>
          <Button  style={{fontSize:'0.5rem'}}variant="light" href="/signin" onClick={() => dispatch(logOut())}>
            <FaSignOutAlt style={{fontSize:'1rem', marginRight: '5px' }} />
            Logout
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <NavLink to="/signup" className="nav-link" style={{ color: '#fff', marginRight: '15px', fontSize:'0.8rem' }}>
            <FaUserPlus style={{ marginRight: '5px' }} />
            Sign Up
          </NavLink>
          <NavLink to="/signin" className="nav-link" style={{ color: '#fff', fontSize:'0.8rem' }}>
            <FaSignInAlt style={{ marginRight: '5px' }} />
            Sign In
          </NavLink>
        </div>
      )}
    </Nav>
  );
}


