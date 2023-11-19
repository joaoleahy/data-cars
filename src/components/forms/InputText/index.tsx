import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import TextField from '@mui/material/TextField';

interface InputTextProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  validation: Control<T, unknown>;
  margin: 'none' | 'normal' | 'dense';
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  invalid: boolean | undefined;
  helperText: string;
}

function InputText<T extends FieldValues>({
  name,
  label,
  validation,
  margin,
  variant,
  invalid,
  helperText,
}: InputTextProps<T>) {
  return (
    <Controller
      name={name}
      control={validation}
      render={({ field }) => (
        <TextField
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          id={field.name}
          ref={field.ref}
          label={label}
          margin={margin}
          error={invalid}
          helperText={<span>{helperText}</span>}
          variant={variant}
        />
      )}
    />
  );
}

export default InputText;
