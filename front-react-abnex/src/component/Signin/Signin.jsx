import React, { memo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setLogin, setSignin } from '../../redux/action/userAction';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


import { useHistory } from 'react-router';

import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import style from './Signin.module.scss';

const Signin = memo(() => {
  const signUser = useSelector((state) => state.signUser);
  let history = useHistory();

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const signinUser = async (mail, password) => {
    const signin = {
      email: mail,
      password,
    };
    const response = await axios
      .post(`http://localhost:3001/user/signin`, signin)
      .catch((err) => {
        toast.error(`${err}`, {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });

      });

    if (response.data && response.data.email) {
      dispatch(setSignin(response.data));
      toast.success(`Veuillez vous identifier dans la page de login`, {
        className: 'sucess-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setTimeout(()=>{
        history.push('/login')
      },3000)
    }else{      
      toast.error(`${response.data}`, {
        className: 'error-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };

  const onSubmit = (data) => {
    signinUser(data.mail, data.password);
  };
  return (
    <div className={style.back}>
      <ToastContainer />
      <div className={style.containerSignin}>
        <div className={style.contentFormulaire}>
          <div className={style.formulaire}>
            <h3>S'inscrire</h3>
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
                  <Link to="/login">Se connecter ?</Link>
                </span>
                <button type="submit"> S'inscrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

Signin.propTypes = {
  children: PropTypes.element,
};

Signin.defaultProps = {
  theme: 'pink',
};
Signin.displayName = 'Signin';

export default Signin;
