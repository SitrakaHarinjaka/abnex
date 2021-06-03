import React, { memo } from 'react';
import PropTypes from 'prop-types';

// import { setComment } from '../../../../redux/action/userAction';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

import style from './CommentaireForm.module.scss';

const CommentaireForm = memo(({id}) => {
  const mail = useSelector((state) => state.isLogged.email);
  const commentsData = useSelector((state) => state.comments.comments);
  
  const { register, handleSubmit } = useForm();
  // const dispatch = useDispatch();


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
        console.log(commentsData);
      }else{      
        toast.error(`${response.data.message}`, {
          className: 'error-toast',
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    };

  const onSubmit = (data) => {
    addComment(mail, data.commentaire );
  };

  return (
    <div className={style.commentContainer}>
      <ToastContainer/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
            <h3>Bonjour {mail} , vous voulez donnez votre avis à propos de cet voiture ? </h3>
          <textarea
            name="commentaire"
            id="commentaire"
            placeholder="laisser un commentaire sur la voiture"
            {...register('commentaire')}
          />
          <div className={style.submitButton}>
            <button type="submit">Laisser un commntaire</button>
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
