import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import { setComment } from '../../../../redux/action/userAction';

import { useDispatch, useSelector  } from 'react-redux';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';


import style from './CommentaireForm.module.scss';
import { setConnectedUser } from '../../../../redux/action/userAction';

const CommentaireForm = memo(({id}) => {
  const[user, setUser] = useState();
  const mail = useSelector((state) => state.isLogged.email);
  
  const commentsData = useSelector((state) => state.comments.comments);
  const getUserActual = useSelector((state)=> state.userConnected._id);
  let history = useHistory();

  
  const { register, handleSubmit } = useForm();
  // const dispatch = useDispatch();

  const getUser = async()=>{
    const response = await axios
    .get(`http://localhost:3001/user/${getUserActual}`)
    .catch((err)=>{
      console.log({message: err});
    });
    if(response.status===200){
      setUser(response.data.email);
    }
  }
  const addComment = async (mail, comments) => {
    const comment = {
      email: mail,
      comments,
      cars: id
    };
    const response = await axios
      .post(`http://localhost:3001/cars/${id}/comments`, comment)
      .catch((err) => {
        toast.error(`${err}`, {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      });
      console.log("response",response);
      if (response.status === 200) {
        // dispatch(setComment(comment));
        toast.success(`${response.data.message}`, {
          className: 'sucess-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setTimeout(()=>{
          history.go(0);
        },3000)

        console.log(commentsData.message);
      }else{      
        toast.error(`${response.data.message}`, {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    };
    useEffect(()=>{
      getUser();
    })
  const onSubmit = (data) => {
    addComment(user, data.commentaire );

  };

  return (
    <div className={style.commentContainer}>
      <ToastContainer/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
            <h3>Bonjour {user} , vous voulez donnez votre avis à propos de cette voiture ? </h3>
          <textarea
            name="commentaire"
            id="commentaire"
            placeholder="laisser un commentaire sur la voiture"
            {...register('commentaire')}
          />
          <div className={style.submitButton}>
            <button type="submit">Laisser un commentaire</button>
          </div>
        </div>
      </form>
    </div>
  );
});

CommentaireForm.propTypes = {
  children: PropTypes.element,
};

CommentaireForm.defaultProps = {
  theme: 'pink',
};
CommentaireForm.displayName = 'CommentaireForm';

export default CommentaireForm;
