import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Item from './utilsListCars/Item'

import style from './ListCars.module.scss';


const ListCars = memo(({ data }) => {

  return (
    <div>
      <section className={style.listCars}>
          <div className={style.itemContainer}>
            {React.Children.toArray(
              data.map((dataCars, index) => {
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
