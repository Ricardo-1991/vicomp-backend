import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { IsDateBR } from 'src/decorators/brazil-date';
import { FormatCPF, IsCPF } from 'src/decorators/cpf';
import { CustomPasswordOptions } from 'src/decorators/strong-password';
export class createUserDto {
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(5, 100)
  name: string;

  @IsNotEmpty({ message: 'o gênero não pode estar vazio.' })
  @Length(5, 100)
  gender: string;

  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  @IsDateBR({
    message: 'A data deve estar no formato DD/MM/YYYY e ser uma data válida.',
  })
  birthDate: Date;

  @IsNotEmpty({ message: 'O cpf não pode estar vazio.' })
  @IsCPF({ message: 'O CPF deve estar no formato XXX.XXX.XXX-XX.' })
  @FormatCPF()
  cpf: string;

  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsStrongPassword({
    minLength: 10,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    customMessages: {
      minLength: 'A senha precisa ter pelo menos 10 caracteres',
      uppercase: 'É necessário pelo menos uma letra maiúscula',
      numbers: 'É necessário pelo menos um número',
      specialChars: 'É necessário pelo menos um caractere especial',
    },
  } as CustomPasswordOptions)
  password: string;

  @IsNotEmpty({ message: 'A cidade não pode estar vazia.' })
  cityId: number;

  @IsNotEmpty({ message: 'A política de privacidade não pode estar vazia.' })
  privacyPolicyAccepted: boolean;
}
