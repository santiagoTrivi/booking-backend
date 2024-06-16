

export interface DataCipherGeneric {
    hash(input: string): Promise<string>;
    compare(input: string, encryptedInput: string): Promise<boolean>;
}