function validateCpf(cpf: string): boolean {
  // Remove pontos e hífen do CPF para obter apenas os números
  const cpfNumbers = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpfNumbers.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos do CPF são iguais
  if (/^(\d)\1+$/.test(cpfNumbers)) {
    return false;
  }

  // Calcula o primeiro dígito verificador do CPF
  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += parseInt(cpfNumbers.charAt(i), 10) * (10 - i);
  }
  let rest = sum % 11;
  const verifyingDigit01 = rest < 2 ? 0 : 11 - rest;

  // Verifica se o primeiro dígito verificador é válido
  if (verifyingDigit01 !== parseInt(cpfNumbers.charAt(9), 10)) {
    return false;
  }

  // Calcula o segundo dígito verificador do CPF
  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += parseInt(cpfNumbers.charAt(i), 10) * (11 - i);
  }
  rest = sum % 11;
  const verifyingDigit02 = rest < 2 ? 0 : 11 - rest;

  // Verifica se o segundo dígito verificador é válido
  if (verifyingDigit02 !== parseInt(cpfNumbers.charAt(10), 10)) {
    return false;
  }

  // Se chegou até aqui, o CPF é válido
  return true;
}

export default validateCpf;
