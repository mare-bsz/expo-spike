import React from 'react';
import { useTranslation } from 'react-i18next';

type ImageProps = {
  imdasId: string;
  title: string;
  width: number;
};

const Image: React.FC<ImageProps> = ({ imdasId, title, width }) => {
  const { t } = useTranslation('image');
  const src = `/sbspike/image?id=${imdasId}&width=${width}`;
  const alt = `${t('altText')} ${title}`;

  return <img src={src} alt={alt} />;
};

export default Image;
