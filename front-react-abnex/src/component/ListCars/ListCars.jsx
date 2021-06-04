import React, { memo, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from '../../redux/action/carsActions';

import {useHistory} from 'react-router'

import Item from './utilsListCars/Item';

import style from './ListCars.module.scss';

const ListCars = memo(() => {
  const cars = useSelector((state) => state.allCars.cars);
  let history = useHistory();

  const dispatch = useDispatch();

  const fetchCars = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_SERVER_HOST}/cars`)
      .catch((err) => {});
    if (response && response.data) {
      dispatch(setCars(response.data));
    }else{
      history.push('/404');
    }
  };

  useEffect(() => {
    fetchCars();
    console.log(process.env)
  }, []);
  return (
    <div>
      <section className={style.listCars}>
        
        <div className={style.itemContainer}>
          {React.Children.toArray(
            cars.map((dataCars, index) => {
              return <Item key={index} data={dataCars} />;
            })
          )}
        </div>
      </section>
    </div>
  );
});

ListCars.propTypes = {
  children: PropTypes.element,
};

ListCars.defaultProps = {
  theme: 'pink',
};
ListCars.displayName = 'ListCars';

export default ListCars;
