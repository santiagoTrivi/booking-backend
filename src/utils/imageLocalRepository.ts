

export class ImageLocalRepository{

    private readonly PATH_STORAGE = `${process.cwd()}/storage`;
    private readonly profileFolder = `${this.PATH_STORAGE}/profile`;
    private readonly postFolder = `${this.PATH_STORAGE}/post`;
    private readonly storieFolder = `${this.PATH_STORAGE}/storie`;
    private readonly messageImageFolder = `${this.PATH_STORAGE}/message`;
    
    get profileFolderPath(): string{
        return this.profileFolder;
    }

    get postFolderPath(): string {
        return this.postFolder;
    }

    get storieFolderPath(): string {
        return this.storieFolder;
    }

    get messageImageFolderPath(): string {
        return this.messageImageFolder;
    }
    
    get rootPath(): string {
        return this.PATH_STORAGE;
    }
    getProfilePicture(filename: string){
        return `${this.profileFolder}/${filename}`;
    }

    getPostImage(filename: string){
        return `${this.postFolder}/${filename}`
    }

    getStorieImage(filename: string){
        return `${this.storieFolder}/${filename}`
    }

    getMessageImage(filename: string): string{
        return `${this.messageImageFolder}/${filename}`
    } 
}