import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * Interface para as mensagens personalizadas
 */
interface CustomPasswordMessages {
  minLength?: string;
  uppercase?: string;
  numbers?: string;
  specialChars?: string;
}

/**
 * Interface para as opções de validação de senha
 */
export interface CustomPasswordOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  customMessages?: CustomPasswordMessages;
}

/**
 * Decorator para validação de senha forte
 */
export function IsStrongPassword(
  passwordOptions: CustomPasswordOptions = {},
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          const options = {
            minLength: passwordOptions.minLength ?? 8,
            requireUppercase: passwordOptions.requireUppercase ?? true,
            requireNumbers: passwordOptions.requireNumbers ?? true,
            requireSpecialChars: passwordOptions.requireSpecialChars ?? true,
          };

          // Armazena as falhas de validação
          const validationErrors: string[] = [];

          // Verifica comprimento mínimo
          if (value.length < options.minLength) {
            validationErrors.push(
              passwordOptions.customMessages?.minLength ??
                `Senha deve ter no mínimo ${options.minLength} caracteres.`,
            );
          }

          // Verifica letra maiúscula
          if (options.requireUppercase && !/[A-Z]/.test(value)) {
            validationErrors.push(
              passwordOptions.customMessages?.uppercase ??
                'Senha deve conter pelo menos uma letra maiúscula.',
            );
          }

          // Verifica números
          if (options.requireNumbers && !/[0-9]/.test(value)) {
            validationErrors.push(
              passwordOptions.customMessages?.numbers ??
                'Senha deve conter pelo menos um número.',
            );
          }

          // Verifica caracteres especiais
          if (options.requireSpecialChars && !/[^a-zA-Z0-9]/.test(value)) {
            validationErrors.push(
              passwordOptions.customMessages?.specialChars ??
                'Senha deve conter pelo menos um caractere especial.',
            );
          }

          // Se existirem erros, retornamos false e o defaultMessage irá pegar essas mensagens
          if (validationErrors.length > 0) {
            args.constraints = validationErrors; // Salva as mensagens de erro
            return false;
          }

          return true;
        },

        defaultMessage(args: ValidationArguments) {
          // Caso haja erros, retornamos as mensagens de erro
          if (args.constraints && args.constraints.length > 0) {
            return args.constraints.join(' ');
          }
          return 'Senha inválida';
        },
      },
    });
  };
}
