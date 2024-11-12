import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Valida se uma string é um CPF válido, verificando formato e dígitos verificadores
 * @param validationOptions Opções de validação adicionais
 * @returns Decorator function
 */
export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Remove caracteres especiais
          const cpf = value.replace(/[^\d]/g, '');

          // Verifica se tem 11 dígitos
          if (cpf.length !== 11) {
            return false;
          }

          // Verifica se todos os dígitos são iguais
          if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
          }

          // Validação do primeiro dígito verificador
          let soma = 0;
          for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
          }
          let resto = (soma * 10) % 11;
          if (resto === 10 || resto === 11) {
            resto = 0;
          }
          if (resto !== parseInt(cpf.charAt(9))) {
            return false;
          }

          // Validação do segundo dígito verificador
          soma = 0;
          for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
          }
          resto = (soma * 10) % 11;
          if (resto === 10 || resto === 11) {
            resto = 0;
          }
          if (resto !== parseInt(cpf.charAt(10))) {
            return false;
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          return 'CPF inválido';
        },
      },
    });
  };
}

/**
 * Decorator que formata o CPF para o padrão XXX.XXX.XXX-XX
 */
export function FormatCPF() {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      if (newVal) {
        // Remove caracteres especiais
        const cleanCPF = newVal.replace(/[^\d]/g, '');
        // Aplica a formatação
        if (cleanCPF.length === 11) {
          value = cleanCPF.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4',
          );
        } else {
          value = newVal;
        }
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
