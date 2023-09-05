import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/multer.options';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload') //POST file-upload
  @UseInterceptors(FileInterceptor('file', multerOption)) // 파일 인터셉터??
  // 인터셉터에서 준 파일을 받음
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    // console.log(file.buffer.toString('utf-8')); // 텍스트 파일 내용 출력
    console.log(file);
    return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`; // 업로드한 파일 명과 경로 반환
  }
}
