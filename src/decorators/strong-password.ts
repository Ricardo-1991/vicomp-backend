// password-validator.decorator.ts
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
          this.validationErrors = [];

          // Verifica comprimento mínimo
          if (value.length < options.minLength) {
            this.validationErrors.push(
              passwordOptions.customMessages?.minLength ??
                `Senha deve ter no mínimo ${options.minLength} caracteres.`,
            );
          }

          // Verifica letra maiúscula
          if (options.requireUppercase && !/[A-Z]/.test(value)) {
            this.validationErrors.push(
              passwordOptions.customMessages?.uppercase ??
                'Senha deve conter pelo menos uma letra maiúscula.',
            );
          }

          // Verifica números
          if (options.requireNumbers && !/[0-9]/.test(value)) {
            this.validationErrors.push(
              passwordOptions.customMessages?.numbers ??
                'Senha deve conter pelo menos um número.',
            );
          }

          // Verifica caracteres especiais
          if (options.requireSpecialChars && !/[^a-zA-Z0-9]/.test(value)) {
            this.validationErrors.push(
              passwordOptions.customMessages?.specialChars ??
                'Senha deve conter pelo menos um caractere especial.',
            );
          }

          return this.validationErrors.length === 0;
        },

        defaultMessage(args: ValidationArguments) {
          if (this.validationErrors?.length > 0) {
            return this.validationErrors.join(' ');
          }
          return 'Senha inválida';
        },
      },
    });
  };
}
