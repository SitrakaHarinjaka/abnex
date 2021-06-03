import React, { memo, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCars } from '../../redux/action/carsActions';
import CommentaireForm from './utilsSingleCars/CommentaireForm';
import CommentaireList from './utilsSingleCars/CommentaireList';
import { Link } from 'react-router-dom';


import styles from './SingleCars.module.scss';

const SingleCars = memo(() => {
  const car = useSelector((state) => state.car);
  const loggedIn = useSelector((state) => state.userConnected);
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
    if (car.mark && car.mark !== undefined) {
      return require(`../../images/${car.mark}.png`).default;
    }
  }, [car.mark]);
  // console.log("eto lesqy euh", loggedIn && loggedIn._id!=='');

  const Commentaire = memo(() => {
    if (loggedIn !== {} && loggedIn._id !== undefined) {
      return (
        <div>
          <CommentaireList id={idCars} />
          <CommentaireForm id={idCars} />
        </div>
      );
    }
    return (
      <div className={styles.containerNotConnected}>
        <div>
          <span>Veuillez vous connecter pour ajouter un commentaire</span>
        </div>
        <div className={styles.button}>
          <Link to='/login'>
              Se connecter
          </Link>
        </div>
      </div>
    );
  }, [loggedIn]);

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
      <Commentaire />
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
