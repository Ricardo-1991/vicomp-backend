import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'; // Import necessário para objetos aninhados
import { IsDateBR } from 'src/decorators/brazil-date';
import { FormatCPF, IsCPF } from 'src/decorators/cpf';
import { CustomPasswordOptions } from 'src/decorators/strong-password';
import { AddressDto } from './addressDto';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O primeiro nome não pode estar vazio.' })
  @Length(5, 100, {
    message: 'O nome deve ter no mínimo 5 e no máximo 100 caracteres.',
  })
  firstName: string;

  @IsNotEmpty({ message: 'O último nome não pode estar vazio.' })
  @Length(5, 100, {
    message: 'O nome deve ter no mínimo 5 e no máximo 100 caracteres.',
  })
  lastName: string;

  @IsNotEmpty({ message: 'O gênero não pode estar vazio.' })
  @Length(5, 100, {
    message: 'O gênero deve ter no mínimo 5 e no máximo 100 caracteres.',
  })
  gender: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  @IsDateBR({
    message: 'A data deve estar no formato DD/MM/YYYY e ser uma data válida.',
  })
  birthDate: Date;

  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  @IsCPF({ message: 'CPF inválido.' })
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

  @IsNotEmpty({ message: 'A política de privacidade não pode estar vazia.' })
  @IsBoolean({ message: 'A política de privacidade deve ser do tipo boolean.' })
  privacyPolicyAccepted: boolean;

  @IsNotEmpty({ message: 'O endereço não pode estar vazio.' })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
