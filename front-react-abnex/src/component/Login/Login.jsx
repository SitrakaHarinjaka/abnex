import React, { memo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setLogin } from '../../redux/action/userAction';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import style from './Login.module.scss';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = memo(() => {
  const isLogged = useSelector((state) => state.isLogged);
  localStorage.setItem('jwtToken', isLogged.token);
  
  let history = useHistory();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  

  const loginUser = async (mail, password) => {
    const login = {
      email: mail,
      password,
    };
    const response = await axios
      .post(`${process.env.REACT_APP_SERVER_HOST}/user/login`, login)
      .catch((err) => {
        console.log('Err', err);
      });      
    dispatch(setLogin(response.data));
    if (response.data.isLogged === true) {
      toast.success(`Bienvenue ${response.data.email}`, {
        className: "sucess-toast",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000
      });
      setTimeout(()=>{
        history.push('/car');
        history.go(0)
      },5000)
    }else{
      toast.error(`User non-identifié, veuillez réessayer`, {
        className: "error-toast",
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      });
    }
  };


  const onSubmit = (data) => {
    
    loginUser(data.mail, data.password);
  };
  return (
    <div className={style.back}>
      <ToastContainer/>
      <div className={style.containerLogin}>
        <div className={style.contentFormulaire}>
          <div className={style.formulaire}>
            <h3>Se connecter</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="mail"
                  placeholder="email"
                  {...register('mail')}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  id="password"
                  {...register('password')}
                />
              </div>
              <div className={style.submitButton}>
                <span>
                  <Link to="/signin">S'inscrire ?</Link>
                </span>
                <button type="submit">Connexion</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

Login.propTypes = {
  children: PropTypes.element,
};

Login.defaultProps = {
  theme: 'pink',
};
Login.displayName = 'Login';

export default Login;
