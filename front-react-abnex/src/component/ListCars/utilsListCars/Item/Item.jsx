import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Item.module.scss';

const Item = memo(({ data }) => {
  const { mark, color, type, description, _id } = data;

  const thumbImage = useMemo(() => {
    return require(`../../../../images/${mark}.png`);
  }, [mark]);


    return (
    <Link to={`/car/${_id}`}>
      <div className={styles.item}>
        <div className={styles.imageVideoContainer}>
          <div className={styles.imageVideo}>
            <img src={thumbImage.default} alt="" />
          </div>
        </div>
        <div className={styles.textContent}>
          <span className={styles.typeContentBlue}>{type}</span>
          <h3>{mark}</h3>
          <span className={styles.author}>
            {color}
          </span>
          <p className={styles.contentAudio}>{description}</p>
        </div>
      </div>
    </Link>
    );
  });

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

Item.defaultProps = {
  data: {},
};

Item.displayName = 'ItemCars';

export default Item;
