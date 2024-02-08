import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("api/files")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("upload")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor("files"))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.appService.uploadFiles(files);
  }

  @Get()
  async getFiles() {
    return await this.appService.getFiles();
  }
}
