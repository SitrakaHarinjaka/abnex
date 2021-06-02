import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

import style from './CommentaireForm.module.scss';

const CommentaireForm = memo(() => {
  const mail = useSelector((state) => state.isLogged.email);
  console.log(mail)
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className={style.commentContainer}>
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
