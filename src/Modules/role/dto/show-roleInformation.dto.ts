import { Expose } from "class-transformer";

export class ShowRoleInformationDto{
    @Expose()
    role: string;
}