import { Request } from "express";
import multer, { diskStorage } from "multer";
import { ImageLocalRepository } from "../utils/imageLocalRepository";
import fs from 'fs';

const imageLocalRepository = new ImageLocalRepository();

const storage = diskStorage({
    
    destination(req: Request, file: Express.Multer.File, cb: any) {

        const givenPath = imageLocalRepository.messageImageFolderPath;
        fs.mkdirSync(givenPath, { recursive: true })
        cb(null, givenPath);
      },
      filename(req: Request, file: Express.Multer.File, cb: any) {
        const ext = file.originalname.split(".").pop();
        const fileNameRandom = `message-${Date.now()}.${ext}`;
        cb(null, fileNameRandom);
      },
    
  });

  export const MessageImgageUpload = multer({storage});