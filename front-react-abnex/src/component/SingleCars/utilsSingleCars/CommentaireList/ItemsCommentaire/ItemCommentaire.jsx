import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './ItemCommentaire.module.scss';

const ItemCommentaire = memo(({ data }) => {
  const { comments, email } = data;

  return (
      <section className={style.container}>
        <div className={style.itemContainer}>
          <span>{email}</span>
          <p>{comments}</p>
        </div>
      </section>
  );
});

ItemCommentaire.propTypes = {
  children: PropTypes.element,
};

ItemCommentaire.defaultProps = {
  theme: 'pink',
};
ItemCommentaire.displayName = 'ItemCommentaire';

export default ItemCommentaire;
