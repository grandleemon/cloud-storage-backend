import { ConflictException, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class AppService {
  async uploadFiles(files: Express.Multer.File[]) {
    const uploadDirectory = "uploads";

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    files.forEach((file) => {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);

      if (fs.existsSync(path.join(uploadDirectory, fileName))) {
        throw new ConflictException("File already exists");
      }

      fs.writeFileSync(filePath, file.buffer);
    });
  }

  async getFiles() {
    const directoryPath = "uploads";

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    return readChildren(directoryPath);
  }
}

const readChildren = (dirPath: string) => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  return entries.map((entry) => {
    const filePath = path.join(dirPath, entry.name);
    const isDirectory = fs.statSync(filePath).isDirectory();

    return {
      name: entry.name,
      children: isDirectory ? readChildren(filePath) : [],
    };
  });
};
