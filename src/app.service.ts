import { ConflictException, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class AppService {
  async uploadFile(file: Express.Multer.File) {
    const uploadDirectory = "uploads";

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    const fileName = file.originalname;
    const filePath = path.join(uploadDirectory, fileName);

    if (fs.existsSync(path.join(uploadDirectory, fileName))) {
      throw new ConflictException("File already exists");
    }

    fs.writeFileSync(filePath, file.buffer);
  }

  async getFiles() {
    const directoryPath = "uploads";

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    const files = fs.readdirSync(directoryPath);

    return readChildren(files);
  }
}

const readChildren = (filenames: string[]) => {
  const read = filenames.map((fileName) => {
    const filePath = path.join("uploads", fileName);
    const fileStats = fs.statSync(filePath);
    const directoryChildren = fileStats.isDirectory()
      ? fs.readdirSync(filePath)
      : [];

    return {
      name: fileName,
      children: directoryChildren,
    };
  });

  return read;
};
