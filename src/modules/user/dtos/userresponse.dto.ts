export class UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  cpf: string;
  address?: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
