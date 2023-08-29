// 1. 데코레이터 함수 import
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service'; // 블로그 서비스 import
import { PostDto } from './blog.model';

@Controller('blog') // 클래스에 붙이는 Controller 데코레이터
export class BlogController {
  // blogService: BlogService;
  // constructor() {
  //   // 2. 생성자에서 블로그 서비스 생성
  //   this.blogService = new BlogService(); // BlogService는 클래스이므로 new 연산자로 인스턴스 생성
  //   // 아직 의존성 주입을 배우지 않았으므로 생성자를 사용.
  // }
  constructor(private blogService: BlogService) {}

  @Get() // 3. GET 요청 처리 - 모든 게시글 가져오기
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.blogService.getAllPosts();
  }

  @Post() // 4. POST 요청 처리 - 게시글 작성
  createPost(@Body() postDto: PostDto) {
    console.log('게시글 작성');
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id') // 6. GET URL 매개변수에 id가 있는 요청 처리 - 게시글 하나 가져오기
  // 비동기를 지원하는 메서드로 시그니처 변경
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}]게시글 하나 가져오기`);

    // 블로그 서비스에서 사용하는 메서드가 비동기로 변경되었으므로 await 사용
    // return this.blogService.getPost(id);
    const post = await this.blogService.getPost(id);
    console.log(post);
    return post;
  }

  @Delete('/:id') // 7. DELETE 방식에 URL 매개변수로 id가 있는 요청 처리 - 게시글 삭제
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogService.deletePost(id);
    return 'success';
  }

  @Put('/:id') // 8. PUT 방식에 URL 매개변수로 id가 있는 요청 처리 - 게시글 수정
  updatePost(@Param('id') id, @Body() postDto) {
    console.log(`[id: ${id}] 게시글 수정`, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}
