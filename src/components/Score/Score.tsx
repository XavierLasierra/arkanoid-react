import React from 'react';
import { IScoreProps } from '../../types/interfaces';

import './score.styles.scss';

export default function Score({ value }: IScoreProps) {
  return <p className="score">{(`${value}`).padStart(6, '0')}</p>;
}
