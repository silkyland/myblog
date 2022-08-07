import { IsNotEmpty } from "class-validator";

  export class ConnectPageDto {
    @IsNotEmpty()
    id: string;
  }
  