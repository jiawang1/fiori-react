import React, { FunctionComponent } from 'react';
import { IFunctionalProps, tBasicSize } from '../common/BasicTypes';

export interface IImageProps extends IFunctionalProps {
  size?: tBasicSize;
  photo: string;
  type: tImageType;
}

export type tImageType = 'circle' | '';

export const Image: FunctionComponent<IImageProps> = ({ size = 'm', type, photo, className, style = {}, ...props }) => {
  const imageStyle = Object.assign({}, style, { backgroundImage: `url(${photo})` });

  return <span className={`${`fd-image--${size}`}${type ? ` fd-image--${type}` : ''}${className ? ` ${className}` : ''}`} style={imageStyle} {...props} />;
};
