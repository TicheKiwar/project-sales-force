import { Expose, Type } from "class-transformer";
import { ShowPersonInformationDto } from "src/Modules/person/dto/show-personInformation.dto";
import { ShowRoleInformationDto } from "src/Modules/role/dto/show-roleInformation.dto";

export class ShowUserDto{
    @Expose()
    username: string;

    @Expose()
    password: string;

    @Expose()
    email: string;

    @Expose()
    @Type(() => ShowRoleInformationDto)
    role: ShowRoleInformationDto;

    @Expose()
    @Type(() => ShowPersonInformationDto)
    person: ShowPersonInformationDto;


}