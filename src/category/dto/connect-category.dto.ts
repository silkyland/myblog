import { IsNotEmpty } from "class-validator";

  export class ConnectCategoryDto {
    @IsNotEmpty()
    id: string;
  }
  