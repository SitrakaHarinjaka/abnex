import React, { memo } from 'react';
import PropTypes from 'prop-types';
import profil from '../../images/profil.jpg';
import style from './Header.module.scss';



const Header = memo(() => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.text}>
          CARS list TEST ( RAKOTOBE Sitraka Harinjaka)
        </div>
        <div className={style.image}>
          <img src={profil} alt="profil" />
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  children: PropTypes.element,
};

Header.defaultProps = {
  theme: 'pink',
};
Header.displayName = 'Header';

export default Header;
