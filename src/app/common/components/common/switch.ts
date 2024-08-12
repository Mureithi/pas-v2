"use client";

import { CustomInput } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import useStore from '../../../../store/useStore'; // Assume a Zustand store is available
import { memo } from 'react';

interface SwitchProps {
  error?: string;
  nomarginbottom?: boolean;
  show?: boolean;
  name: string;
  label: string;
  control: any;
}

const Switch: React.FC<SwitchProps> = ({ error, nomarginbottom, show, name, label, control }) => {
  const setCustomValue = useStore((state) => state.setCustomValue);
  const mbottom = nomarginbottom ? 30 : null;
  const customClass = `form-group animate__animated animate__fadeIn ${show ? '' : ''}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(name, e.target.checked);
  };

  return (
    <div className={`${customClass}`} style={{ marginBottom: mbottom }}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value } }) => {
          return (
            <CustomInput
              type="switch"
              id={name}
              name={name}
              checked={value}
              label={label}
              onChange={onChange}
              className="cursor-pointer"
            />
          );
        }}
      />
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default memo(Switch);
