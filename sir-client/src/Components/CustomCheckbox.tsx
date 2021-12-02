import React, { KeyboardEventHandler, useState } from 'react';
import { Formik } from 'formik';
import * as events from 'events';

type CustomCheckboxProps = {
  text: string;
  checked?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  text,
  checked,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  const handleKeys = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsChecked(!isChecked);
    }
  };
  return (
    <div
      className="checkbox"
      data-checked={isChecked}
    >
      <input type="checkbox" checked={isChecked} />
      <span
        onClick={handleClick}
        onKeyPress={handleKeys}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
      >
        {text}
      </span>
    </div>
  );
};

CustomCheckbox.defaultProps = {
  checked: false,
};

export default CustomCheckbox;
