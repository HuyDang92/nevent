import React from 'react';

interface RadioProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  classNameLabel?: string;
  classNameInput?: string;
}
const Radios = ({ children, className, label, classNameLabel, classNameInput }: RadioProps) => {
  return (
    <div className={`${className}`}>
      {label !== undefined ? (
        <>
          <label className={`flex gap-1 p-2 font-medium ${classNameLabel}`}>
            <span>{label}</span>
            <span className="grid h-2 place-content-center self-start text-red-500">&lowast;</span>
          </label>
        </>
      ) : (
        <></>
      )}
      <div className={classNameInput}>{children}</div>
    </div>
  );
};

export default Radios;
