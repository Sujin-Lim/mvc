# mvc
그냥 기본내용 정리함

순서

클라이언트가 URL로 접근해 DispatcherServlet으로 정보 요청
해당 요청을 매핑한 컨트롤러가 있는지 HandlerMapping이 검색
컨트롤러로 처리 요청
결과 출력할 view 이름을 DispatcherServlet으로 리턴
처리 view를 검색하기 위해 ViewResolver
처리 결과를 view에 송신
처리 결과 포함된 view를 DispatcherServlet으로 송신
클라이언트로 최종 결과 출력

클라이언트가 웹 페이지에서 기능 요청
프론트에서 HTTP 요청 서버로 보냄
컨트롤러가 요청을 받아 처리하고 서비스에 로직 처리 위임
서비스가 로직 수행. 필요 데이터를 얻기 위해 dao에 접근
dao는 mapper를 사용해 쿼리 실행해 db에서 데이터 사용
데이터는 dto를 통해 서비스로 전달후 처리하고 컨트롤러로 반환
컨트롤러가 처리된 데이터를 프론트로 줌


controller: 클라이언트 요청을 dto 형태로 받아 service의 기능 호출하고 응답을 dto 형태로 반환 -> 요청과 응답을 관리하는 계층
            클래스 명 앞에 @Controller 어노테이션 사용해야 함
service: dto를 통해 받은 데이터를 이용해 비즈니스 로직 처리하고 dao를 통해 db에 접근해 데이터 관리
dto: data transfer object 순수 데이터 객체. getter, setter 메서드만 가짐
dao: data access object 실제 db에 접근하는 객체



