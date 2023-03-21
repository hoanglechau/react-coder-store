import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Switch, FormControlLabel } from '@mui/material';

function FSwitch({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={(
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={field.value} />}
        />
              )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {...other}
    />
  );
}

export default FSwitch;
