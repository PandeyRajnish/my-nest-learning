import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Country {
  INDIA = 'India',
  USA = 'USA',
  UK = 'UK',
  CANADA = 'Canada',
  AUSTRALIA = 'Australia',
}

export class AuthDto {
  //   @IsEmpty() // must be empty
  @IsString() // must be a string
  @Length(3, 20) // min 3 max 20
  name: string;

  @IsEmail() // must be a valid email
  @IsNotEmpty() // must be not empty
  email: string;

  @IsAlphanumeric() // must be alphanumeric
  @IsNotEmpty() // must be not empty
  @MinLength(8, {
    message: 'Password must be at least $constraint1 characters long',
  }) // min 8 and custom message with $constraint1 placeholder for the min length
  @MaxLength(15, {
    message: 'Password must be at most $constraint1 characters long',
  }) // max 15 and custom message with $constraint1 placeholder for the max length
  password: string;

  //   This is the old way to check for the values in the array
  //   @IsEnum(['India', 'USA', 'UK', 'Canada', 'Australia'], {
  //     message: 'Country must be from [$constraint1 ] not $value',
  //   }) // Will check for the values in the array and custom message with $constraint1 placeholder for the enum and $value placeholder for the value
  //   country: string;

  //   This is the new way to check for the values in the enum
  @IsEnum(Country) // The IsEnum validator will display the values automatically upon any validation
  country: Country;

  //   @IsDate() // must be a valid date and data must be in javascript data object format that's why transformer is used to convert the string to date
  @IsDateString() // must be a valid date string and data must be in string format? check the ISO8601 format yyyy-mm-dd, Type don't need to be used here because the IsDateString validator will convert the string to date automatically
  //   @Type(() => Date) // transformer is used to convert the string to date
  dob: Date;

  //   @IsOptional() // must be optional
  //   @IsString() // must be a number
  //   @Matches(/^[0-9]{10,11}$/, {
  //     message: 'Phone number must be 10 or 11 digits',
  //   })
  //   phone: number;

  @IsOptional() // must be optional
  @IsNumber() // must be a number
  phone: number;
}
