import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { IsDateBR } from 'src/decorators/brazil-date';
import { FormatCPF, IsCPF } from 'src/decorators/cpf';
import { CustomPasswordOptions } from 'src/decorators/strong-password';
export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(5, 100, {
    message: 'O nome deve ter nomeno 5 e no máximo 100 caracteres.',
  })
  name: string;

  @IsNotEmpty({ message: 'o gênero não pode estar vazio.' })
  @Length(5, 100, {
    message: 'O gênero deve ter no mínimo 5 e no máximo 100 caracteres.',
  })
  gender: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  @IsDateBR({
    message: 'A data deve estar no formato DD/MM/YYYY e ser uma data válida.',
  })
  birthDate: string;

  @IsNotEmpty({ message: 'O cpf não pode estar vazio.' })
  @IsCPF({ message: 'O CPF inválido.' })
  @FormatCPF()
  cpf: string;

  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsStrongPassword(
    {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    } as CustomPasswordOptions,
    { message: 'A senha deve ter o padrão especificado.' },
  )
  password: string;

  @IsNotEmpty({ message: 'A cidade não pode estar vazia.' })
  @IsNumber()
  cityId: number;

  @IsNotEmpty({ message: 'A política de privacidade não pode estar vazia.' })
  @IsBoolean({ message: 'A privacidade deve ser do tipo boolean.' })
  privacyPolicyAccepted: boolean;
}
