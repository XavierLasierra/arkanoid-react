import React from 'react';
import { ILivesProps } from '../../types/interfaces';

import './lives.styles.scss';

export default function Lives({ lives }: ILivesProps) {
  return (
    <p className="lives">
      {lives}
      ♥
    </p>
  );
}
