import React from 'react';
import { useTranslation } from 'react-i18next';
import './Image.scss';
import classNames from 'classnames';

export enum ImageModifier {
  COVER = 'cover',
  INVISIBLE = 'invisible',
}

type ImageProps = {
  imdasId: string;
  title: string;
  width: number;
  modifier?: ImageModifier;
};

const Image: React.FC<ImageProps> = ({ imdasId, modifier, title, width }) => {
  const { t } = useTranslation('image');
  const src = `/sbspike/image?id=${imdasId}&width=${width}`;
  const alt = `${t('altText')} ${title}`;
  const [isInvisible, setIsInvisible] = React.useState(false);

  return (
    <img
      className={classNames('image', {
        [`image--${modifier}`]: Boolean(modifier),
        [`image--${ImageModifier.INVISIBLE}`]: isInvisible,
      })}
      src={src}
      alt={alt}
      width={width}
      onError={() => {
        // if there is no image (40x), just show empty space
        setIsInvisible(true);
      }}
    />
  );
};

export default Image;
