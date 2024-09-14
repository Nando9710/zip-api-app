import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ "message": "Name field cannot be empty" })
  name: string;

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEmail()
  @IsNotEmpty({ "message": "Email field cannot be empty" })
  email: string;

  @IsString()
  @IsNotEmpty({ "message": "Password field cannot be empty" })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Password is not to strong',
    },
  )
  password: string;
}
