import React, { memo, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setConnectedUser } from '../../redux/action/userAction';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import profil from '../../images/profil.jpg';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import logo from '../../images/logo.jpg';

const Header = memo(() => {
  const userConnected = useSelector((state) => state.userConnected);
  

  const dispatch = useDispatch();

  const sessionuser = localStorage.getItem('jwtToken');
  const checkUserSession = async () => {
    const response = await axios
      .get('http://localhost:3001/private', {
        headers: {
          'auth-token': sessionuser,
        },
      })
      .catch((err) => {
        
      });
      if(response){
        dispatch(setConnectedUser(response.data));
      }

  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const MenuNavigation = memo(() => {
    let history = useHistory();

    const removeSession = useCallback((key)=>{
      if (localStorage.getItem(key) === null)
        return false;
    localStorage.removeItem(key);
    return true;
    },[]);

    const deconnecter = () => {
      const isSessionRemoved = removeSession('jwtToken');
        if(isSessionRemoved){
          toast.error(`Vous êtes déconnecté`, {
            className: "error-toast",
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
        }
      setTimeout(()=>{
        history.go(0);
      },3000)
    };
    if (userConnected && userConnected._id) {
      return (
        <ul>
          <ToastContainer/>
          <li>
            <Link to="/car">Liste</Link>
          </li>
          <li>
            <button onClick={deconnecter}>Déconnexion</button>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li>
          <Link to="/signin">S'inscrire</Link>
        </li>
        <li>
          <Link to="/login">Se connecter</Link>
        </li>
        <li>
          <Link to="/car">Liste</Link>
        </li>
      </ul>
    );
  });

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className={style.navImage}>
          <div className={style.navigation}>
            <nav>
              <MenuNavigation />
            </nav>
          </div>
          <div className={style.image}>
            <img src={profil} alt="profil" />
          </div>
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  children: PropTypes.element,
};

Header.defaultProps = {
  theme: 'pink',
};
Header.displayName = 'Header';

export default Header;
