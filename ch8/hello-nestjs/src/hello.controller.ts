import { Controller, Get } from "@nestjs/common"; // 1. 필요한 함수 import
// Contoller, Get은 대문자로 시작하지만 함수이며 데코레이터다.
/*
? 데코레이터?
* 데코레이터는 클래스, 함수, 변수에 위나 왼쪽에 붙일 수 있으며 해당 코드의 동작을 변경한다.
* 앞에 @가 붙으면 데코레이터다.
* 클래스와 함수의 앞뒤에 전후 처리를 해주어서 해당 코드의 동작에 부가적인 기능을 추가하는 때 사용한다.
*/

@Controller() // 2. 컨트롤러 데코레이터
export class HelloController {
  // 3. 외부에서 사용하므로 export를 붙여준다.
  @Get() // 4. GET 요청 처리 데코레이터
  hello() {
    return "안녕하세요! NestJS로 만든 첫 애플리케이션입니다.";
  }
}
