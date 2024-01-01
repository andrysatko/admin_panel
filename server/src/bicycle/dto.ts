import { IsNotEmpty, IsString,IsEnum, IsNumber, MinLength } from 'class-validator';
import { Prisma,BicycleStatus} from '@prisma/client';

export class CreateBicycleDto implements Prisma.BicycleCreateInput {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    type: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    color: string;
  
    @IsNotEmpty()
    @IsNumber()
    wheelSize: number;
  
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    description: string;
  }

export class UpdateStatusDto implements Prisma.BicycleUpdateInput{
    @IsNotEmpty()
    @IsEnum(BicycleStatus)
    status: BicycleStatus
}
