import { Request } from "express";
import multer, { diskStorage } from "multer";
import { ImageLocalRepository } from "../utils/imageLocalRepository";
import fs from 'fs';

const imageLocalRepository = new ImageLocalRepository();

const storage = diskStorage({
    
    destination(req: Request, file: Express.Multer.File, cb: any) {

        const givenPath = imageLocalRepository.postFolderPath;
        fs.mkdirSync(givenPath, { recursive: true })
        cb(null, givenPath);
      },
      filename(req: Request, file: Express.Multer.File, cb: any) {
        const ext = file.originalname.split(".").pop();
        const fileNameRandom = `post-${Date.now()}.${ext}`;
        cb(null, fileNameRandom);
      },
    
  });

  export const postImageUpload = multer({storage});