import React, { memo,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../../../redux/action/carsActions';

import axios from 'axios';

import style from './CommentaireList.module.scss';
import ItemCommentaire from './ItemsCommentaire';

const CommentaireList = memo(({id}) => {
  const commentsList = useSelector((state) => state.comments.comments);
  
  const dispatch = useDispatch();


  const fetchCommentaire = async () => {
    const response = await axios
      .get(`http://localhost:3001/cars/${id}/comments`)
      .catch((err) => {
        console.log('Err', err);
      });
    dispatch(getComments(response.data[0]["postComments"]));
    console.log(commentsList);
    
  };

  useEffect(() => {
    fetchCommentaire();
  }, []);


  return (
    <div>
      <section className={style.listCars}>
        <div className={style.itemContainer}>
        {commentsList && React.Children.toArray(
              commentsList.map((dataComment, index) => {
                return <ItemCommentaire key={index} data={dataComment} />;
              })
            )}
        </div>
      </section>
    </div>
  );
});

CommentaireList.propTypes = {
  children: PropTypes.element,
};

CommentaireList.defaultProps = {
  theme: 'pink',
};
CommentaireList.displayName = 'CommentaireList';

export default CommentaireList;
