export class UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  address?: {
    street: string;
    number: string;
    zipcode: string;
    city: string;
  };
}
