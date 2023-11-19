import { useId } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';

import FormControl from '~/components/forms/FormControl';
import Feedback from '~/components/Feedback';
import InputText from '~/components/forms/InputText';
import { useAuthContext } from '~/contexts/AuthContext';
import loginSchema, { LoginSchema } from './validation';

function Login() {
  const { login } = useAuthContext();
  const formId = useId();

  const { isLoading, isSuccess, isError, mutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: (cpf: string) => login(cpf),
  });

  const handleSubmit = (data: LoginSchema) => {
    mutate(data.cpf);
  };

  return (
    <Box sx={{ maxWidth: '400px' }}>
      <Typography variant="h5" textAlign="center" mb={3}>
        Login
      </Typography>
      <Feedback
        successMessage="Usuário autenticado com sucesso"
        errorMessage="Usuário ou senha inválidos"
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
      <Box sx={{ display: 'grid', width: '100%' }}>
        <FormControl
          styles={{ display: 'grid', width: '100%' }}
          formId={formId}
          defaultValues={null}
          formValidationSchema={loginSchema}
          render={(control, errors) => (
            <>
              <InputText
                name="nome"
                label="Nome"
                validation={control}
                invalid={!!errors.nome}
                helperText={errors.nome?.message as string}
                margin="normal"
                variant="outlined"
              />
              <InputText
                name="cpf"
                label="Cpf"
                validation={control}
                invalid={!!errors.cpf}
                helperText={errors.cpf?.message as string}
                margin="normal"
                variant="outlined"
              />
            </>
          )}
          onSubmit={handleSubmit}
        />
        <Button
          type="submit"
          form={formId}
          disabled={isLoading}
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Entrar
        </Button>
      </Box>
      <MuiLink variant="body2" component={Link} to="signup">
        Não possui uma conta? Cadastre-se
      </MuiLink>
    </Box>
  );
}

export default Login;
