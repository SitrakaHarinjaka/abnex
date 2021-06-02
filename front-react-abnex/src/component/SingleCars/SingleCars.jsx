import React, { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCars } from '../../redux/action/carsActions';

import styles from './SingleCars.module.scss';

const SingleCars = memo(() => {
  const car = useSelector((state) => state.car);
  const [img, setImg] = useState('');
  const { mark, color, description, type } = car;
  const { idCars } = useParams();
  const dispatch = useDispatch();

  const fetchSingleCarDetail = async () => {
    const response = await axios
      .get(`http://localhost:3001/cars/${idCars}`)
      .catch((err) => {
        console.log('Err', err);
      });
    dispatch(selectedCars(response.data));
  };
  useEffect(() => {
    if (idCars && idCars !== '') fetchSingleCarDetail();
  }, [idCars]);

  const thumbImage = useMemo(() => {
    // if(car && car!==""){
    //   return require(`../../images/${car.mark}.png`);
    // }
    if (car.mark && car.mark !== undefined) {
      return require(`../../images/${car.mark}.png`).default;
    }
  }, [car.mark]);


  return (
    <section className={styles.singleCar}>
      <div className={styles.singleCar}>
        <div className={styles.item}>
          <div className={styles.imageVideoContainer}>
            <div className={styles.imageVideo}>
              <img src={thumbImage} alt="" />
            </div>
          </div>
          <div className={styles.textContent}>
            <span className={styles.typeContentBlue}>{type}</span>
            <h3>{mark}</h3>
            <span className={styles.author}>{color}</span>
            <p className={styles.contentAudio}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
});

SingleCars.propTypes = {
  children: PropTypes.element,
};

SingleCars.defaultProps = {
  theme: 'pink',
};
SingleCars.displayName = 'SingleCars';

export default SingleCars;
