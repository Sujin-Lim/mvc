# mvc
그냥 기본내용 정리함

Model:애플리케이션의 비즈니스 로직과 데이터를 처리. Service, DTO, DAO
View: 화면 구현, HTML, CSS, JS...
Controller: 사용자의 입력을 받아 Model과 View 사이에서 중개하는 역할

DTO: Data Transfer Object. 순수 데이터 객체로 getter, setter 메서드만 가짐
DAO: Data Access Object. 실제 DB에 접근하는 객체
Controller: 클라이언트 요청을 DTO 형태로 받아 Service의 기능을 호출하고 적절한 응답을 DTO 형태로 반환( 요청과 응답을 관리하는 계층), @Controller 어노테이션 붙임
Service: DTO를 통해 받은 데이터를 이용해 비즈니스 로직을 처리하고 DAO를 통해 DB에 접근해 데이터 관리

순서

클라이언트가 웹 페이지에서 기능 요청 
> 프론트에서 HTTP 요청을 서버로 보냄 (나는 Ajax 썼음)
> Controller가 요청을 받아 처리하고 Service에 로직 처리 위임
> Service가 로직 수행을 위한 필요 데이터를 얻기 위해 DAO에 접근
> DAO는 Mapper를 사용해 Service로 전달, 처리 후 Controller로 반환
> Controller가 처리된 데이터를 프론트로 줌 (필요한 경우 View를 통해 렌더링)

//////////////////////////////////////////////////////////

클라이언트가 URL로 접근해 DispatcherServlet으로 정보 요청
해당 요청을 매핑한 컨트롤러가 있는지 HandlerMapping이 검색
컨트롤러로 처리 요청
결과 출력할 view 이름을 DispatcherServlet으로 리턴
처리 view를 검색하기 위해 ViewResolver
처리 결과를 view에 송신
처리 결과 포함된 view를 DispatcherServlet으로 송신
클라이언트로 최종 결과 출력

/////////////////////////////////////////////////////////

DAO는 인터페이스로 생성. MyBatis로부터 비즈니스 로직 분리
MyBatis가 인터페이스의 구현체를 자동으로 생성해 줌
Mapper의 namespace는 DAO의 풀 패키지 이름 사용
                id는 DAO에서 정의된 메서드 이름
        resultType은 쿼리의 결과를 어떤 타입 객체로 매핑할지 지정
DTO 정의 클래스에 있는 필드 이름과 DB 컬럼 이름이 일치하면 MyBatis가 자동으로 매핑해 줌


