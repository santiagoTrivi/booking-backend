export interface IFileuploadService {
    upload(file: Express.Multer.File, collection: string): Promise<string>;
    update(file: Express.Multer.File, collection: string): Promise<void>;
    delete(filename: string, collection: string): Promise<void>;
}

export interface IGetFileService<T> {
    get(filaname: string, collection: string): Promise<T>;
}