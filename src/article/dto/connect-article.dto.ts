import { IsNotEmpty } from "class-validator";

  export class ConnectArticleDto {
    @IsNotEmpty()
    id: string;
  }
  