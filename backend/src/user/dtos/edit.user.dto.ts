import { CreateUserDto } from "./create.user.dto";

export interface EditUserDto extends Partial<CreateUserDto>{
}