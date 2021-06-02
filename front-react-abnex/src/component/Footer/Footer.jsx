import React, { memo } from 'react';
import PropTypes from 'prop-types';

import style from './Footer.module.scss';

const Footer = memo(({ theme, children }) => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
       Copyright by Sitraka Harinjaka
      </div>
    </footer>
  );
});

Footer.propTypes = {
  children: PropTypes.element,
};

Footer.defaultProps = {
  theme: 'pink',
};
Footer.displayName = 'Footer';

export default Footer;
