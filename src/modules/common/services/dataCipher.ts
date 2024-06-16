import { compare, hash } from "bcryptjs";
import { DataCipherGeneric } from "../domain/dataChiperGeneric.interface";


export class DataCipher implements DataCipherGeneric {
    async hash(input: string): Promise<string> {
        return await hash(input, 8);
    }
    async compare(input: string, encryptedInput: string): Promise<boolean> {
        return await compare(input, encryptedInput);
    }
    
}