import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddressDto {
  @IsNotEmpty({ message: 'A rua não pode estar vazia.' })
  @Length(5, 100, {
    message: 'A rua deve ter no mínimo 5 e no máximo 100 caracteres.',
  })
  street: string;

  @IsNotEmpty({ message: 'O número não pode estar vazio.' })
  @IsString({ message: 'O número deve ser uma string.' })
  number: string;

  @IsNotEmpty({ message: 'O CEP não pode estar vazio.' })
  @Length(8, 8, { message: 'O CEP deve ter 8 caracteres.' })
  @IsString({ message: 'O CEP deve ser uma string.' })
  zipcode: string;

  @IsNotEmpty({ message: 'A cidade não pode estar vazia.' })
  @Length(5, 100, { message: 'A cidade deve ter no mínimo 5 caracteres.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
  city: string;
}
