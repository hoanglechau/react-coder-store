import React from 'react';
import { FormProvider as RHFormProvider } from 'react-hook-form';

function FormProvider({ children, onSubmit, methods }) {
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

export default FormProvider;
