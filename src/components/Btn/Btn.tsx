import React from 'react';

import './Btn.scss';
interface Props {
  value: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  isClickable?: boolean;
}
export const Btn = ({ value, onClick, isClickable = true }: Props) => {
    return (
        <input
            type="button"
            className={`Button__input ${isClickable && 'Button__input--clickable'}`}
            value={value}
            onClick={onClick}
        />
    );
};
