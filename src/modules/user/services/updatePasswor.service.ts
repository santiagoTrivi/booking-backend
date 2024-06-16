import { DataCipherGeneric } from "../../common/domain";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { UpdateUserPasswordDto } from "../domain/dtos/updateUserPassword.dto";
import { getUserByIdService } from "./getUserById.service";


export class UpdatePasswordService {

    constructor(private readonly dataCipher: DataCipherGeneric){}

    run = async (userId: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<void> => {

        const { currentPassword, newPassword } = updateUserPasswordDto;

        const foundUser = await getUserByIdService(userId);

        const isSamePassword = await this.dataCipher.compare(currentPassword, foundUser.password);

        if(!isSamePassword) throw new BadRequestError('CURRENT_PASSWORD_INCORRECT', 'PASSWORD_INCORRECT');

        const hashedNewPassword = await this.dataCipher.hash(newPassword);

        foundUser.password = hashedNewPassword;
        
        const isPasswordUpdated = await foundUser.save();

        if(!isPasswordUpdated) throw new BadRequestError('SOMETHING WENT WRONG UPDATING THE ERROR', 'UPDATE ERROR');

        return
    }
}