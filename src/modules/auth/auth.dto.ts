interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

export class AuthResponseDto {
  token: string;
  expiresIn: number;
  user: UserProps;
}
