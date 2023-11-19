import { ReactNode } from 'react';
import {
  useForm,
  FieldValues,
  DeepPartial,
  Control,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, ZodTypeDef } from 'zod';
import { SxProps, Theme } from '@mui/material';

import Box from '@mui/material/Box';

interface FormControlProps<T extends FieldValues> {
  formValidationSchema: ZodSchema<T, ZodTypeDef, unknown>;
  formId: string;
  defaultValues: DeepPartial<T> | null;
  styles: SxProps<Theme>;
  onSubmit: (data: T) => void;
  render: (control: Control<T, unknown>, errors: FieldErrors<T>) => ReactNode;
}

function FormControl<T extends FieldValues>({
  formValidationSchema,
  formId,
  defaultValues,
  styles,
  onSubmit,
  render,
}: FormControlProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(formValidationSchema),
    ...(defaultValues && { defaultValues }),
  });

  return (
    <Box
      id={formId}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      sx={styles}
    >
      {render(control, errors)}
    </Box>
  );
}

export default FormControl;
