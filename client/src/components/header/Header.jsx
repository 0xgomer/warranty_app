import React, {useEffect, useState} from 'react';
import {Link, Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/reducers/UserReducer";
import Logo from "../UI/logo/Logo";
import Button from "../UI/button/Button";
import './header.css'

const Header = ({loginForm, setLoginForm, registrationForm, setRegistrationForm}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth, user} = useSelector(store => store.user)
    const [navOpen, setNavOpen] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        if (navOpen){
            setNavOpen(false)
            document.body.classList.remove('navOpen')
        }
    }, [pathname, loginForm, registrationForm])

    const navOpenHandler = () => {
        if (!navOpen){
            setNavOpen(true)
            document.body.classList.add('navOpen')
        } else {
            setNavOpen(false)
            document.body.classList.remove('navOpen')
        }
    }

    const logoutHandler = () => {
        dispatch(logoutUser())
        navigate('/')
    }

    return (
        <div className='header'>
           <div className="container">
               <div className="header__logo">
                   <Logo type={navOpen && 'dark'}/>
               </div>
               <nav>
                   <NavLink to="/"  className={({ isActive}) => isActive ? "active" : ""}>Home</NavLink>
                   <NavLink to="/warranty" className={({ isActive}) => isActive ? "active" : ""}>warranty</NavLink>
                   <NavLink to="/about" className={({ isActive}) => isActive ? "active" : ""}>about us</NavLink>
               </nav>
               <div className="header__buttons">
                   {(isAuth)
                       ? (
                           <>
                               {(user.role == 'admin' || user.role == 'moderator') && <Link to='admin'><Button type='primary'>Admin</Button></Link>}
                               <Link to='profile'><Button type='primary'>Profile</Button></Link>
                               <Button onClick={logoutHandler}>Exit</Button>
                           </>
                       )
                       :(
                           <>
                               <Button type='primary' onClick={() => setRegistrationForm(true)}>Registration</Button>
                               <Button onClick={() => setLoginForm(true)}>Login</Button>
                           </>
                       )
                   }
               </div>
               <span className="header__burger-btn" onClick={navOpenHandler}></span>
           </div>
        </div>
    );
};

export default Header;