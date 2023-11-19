import { Controller, Path, FieldValues, Control } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface AutoCompleteOptions {
  id: string;
  label: string;
}

interface AutoCompleteProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  validation: Control<T, unknown>;
  options: AutoCompleteOptions[];
  margin: 'none' | 'normal' | 'dense';
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  invalid: boolean | undefined;
  helperText: string;
}

function AutoComplete<T extends FieldValues>({
  name,
  label,
  validation,
  options,
  margin,
  variant,
  invalid,
  helperText,
}: AutoCompleteProps<T>) {
  return (
    <Controller
      name={name}
      control={validation}
      render={({ field }) => (
        <Autocomplete
          fullWidth
          disablePortal
          id={name}
          getOptionLabel={(option) => option.label || ''}
          options={options}
          ref={field.ref}
          onBlur={field.onBlur}
          onChange={(_, value) => field.onChange(value?.id)}
          renderInput={(params) => (
            <TextField
              label={label}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              margin={margin}
              variant={variant}
              error={invalid}
              helperText={<span>{helperText}</span>}
            />
          )}
        />
      )}
    />
  );
}

export default AutoComplete;
