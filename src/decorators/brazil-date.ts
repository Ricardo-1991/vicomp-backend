import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Valida se uma string está no formato de data brasileiro (DD/MM/YYYY)
 * e se é uma data válida
 * @param options Opções de validação adicionais
 * @returns Decorator function
 */
export function IsDateBR(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateBR',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }

          // Verifica o formato DD/MM/YYYY
          const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          const matches = value.match(regex);

          if (!matches) {
            return false;
          }

          // Extrai os componentes da data
          const [_, day, month, year] = matches.map(Number);

          // Verifica se o ano está em um intervalo razoável
          if (year < 1900 || year > 2100) {
            return false;
          }

          // Verifica se o mês está entre 1 e 12
          if (month < 1 || month > 12) {
            return false;
          }

          // Array com o número de dias em cada mês
          const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

          // Ajusta fevereiro para anos bissextos
          if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            daysInMonth[1] = 29;
          }

          // Verifica se o dia é válido para o mês
          if (day < 1 || day > daysInMonth[month - 1]) {
            return false;
          }

          return true;
        },

        defaultMessage() {
          return 'A data deve estar no formato DD/MM/YYYY e ser uma data válida';
        },
      },
    });
  };
}
