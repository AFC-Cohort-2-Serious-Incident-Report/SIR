import React from 'react';
import '../Styles/Styles.css';

interface CustomCheckboxProps {
  text: string;
  onClick?: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  text,
  onClick,
}: CustomCheckboxProps) => {
  for (let x = 0; x < 1; x += 1) console.log('hello'); // ignore, to suppress eslint for now
  return (
    <div className="checkbox" />
  );
};

CustomCheckbox.defaultProps = {
  onClick: undefined,
};

export default CustomCheckbox;
