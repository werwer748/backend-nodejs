import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model'; // 1. 게시글의 타입 정보 임포트
import { BlogMongoRepository } from './blog.repository';
// import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  //   posts = [];
  // blogRepository: BlogRepository; //? 의존성 주입 전.
  // constructor() {
  //   // 블로그 리포지토리 객체 생성
  //   this.blogRepository = new BlogFileRepository();
  // }
  // constructor(private blogRepository: BlogFileRepository) {}
  // 클래스를 인터페이스에 맞춰서 만들었기 때문에 사용되는 코드들은 변경하지 않아도 된다.
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost(); // 3. 모든 게시글을 반환
  }

  createPost(postDto: PostDto) {
    // 4. 게시글 작성
    // const id = this.posts.length + 1;
    // this.posts.push({
    //   id: id.toString(),
    //   ...postDto,
    //   createdDt: new Date(),
    // });
    this.blogRepository.createPost(postDto);
  }

  async getPost(id) {
    // 5. 게시글 하나 가져오기
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;
    return await this.blogRepository.getPost(id);
  }

  deletePost(id) {
    // 6. 게시글 삭제
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    // 7. 게시글 수정
    // const updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { id, ...postDto, updatedDt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;
    this.blogRepository.updatePost(id, postDto);
  }
}
