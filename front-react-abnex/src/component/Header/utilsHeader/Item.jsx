import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import Button from '@brandandcelebrities/kolkitten/Button';

import { loadLexique } from 'actions/lexique';

import style from './Item.module.scss';

const Item = memo(({ data, disabled }) => {

  const { title, subtitle, text, link, visuel } = data;
  const linkImg = useMemo(() => {
    return require(`static/images/studies/${visuel}.png`);
  }, [visuel]);

  return (
    <div className={style.item}>
      <div className={style.textContent}>
        <span className={style.typeContent}>{title}</span>
        <h3>{subtitle}</h3>
        <div className={style.itemBody}>
          <p>{text}</p>
          <div className={style.image}>
            <img src={(linkImg.default)?linkImg.default:linkImg} alt={visuel} />
          </div>
        </div>
      </div>
      <div className={style.buttonContent}>
        {!disabled && (
          <a className={style.itemCta} href={link} target="_blank" rel="noopener noreferrer">
            <Button asSpan size="small" label={t(l, 'studies:cta.download')} />
          </a>
        )}
        {disabled && <div className={style.itemCta}>{cta}</div>}
      </div>
    </div>
  );
});

Item.getInitialProps = async (ctx) => {
  await loadLexique(ctx, ['studies']);
  return {};
};

Item.propTypes = {
  data: PropTypes.object,
};
Item.defaultProps = {
  data : [
    {
      "title": "",
      "subtitle": "",
      "text": "",
      "link": "",
      "visuel": ""
    },
  ]
};
Item.displayName = 'ItemStudies';

export default Item;
