import { deleteFile } from "./deleteFile";
import { ImageLocalRepository } from "./imageLocalRepository";

export class ImageService {
  private readonly imageRepo;

  constructor() {
    this.imageRepo = new ImageLocalRepository();
  }

  async delete(imageName: string) {
    const directory = this.imageRepo.getPostImage(imageName);
    await deleteFile(directory);
  }
}
