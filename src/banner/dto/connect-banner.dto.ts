import { IsNotEmpty } from "class-validator";

export class ConnectBannerDto {
  @IsNotEmpty()
  id: string;
}
