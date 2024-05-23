import { Expose } from "class-transformer";

export class ShowPersonInformationDto{
    @Expose()
    cedula: string;

    @Expose()
    firstName: string;

    @Expose()
    middleName: string;

    @Expose()
    lastName: string;

    @Expose()
    birthDate: Date;
}