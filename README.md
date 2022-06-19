

## Wanted Pre OnBoarding

---

원티드 프리온보딩 백엔드 사전과제입니다. NestJS, TypeORM, Postgres를 사용하였습니다.



## Setup

---

```bash
$ git clone https://github.com/ymink716/wanted_pre_onboarding.git
$ cd wanted_pre_onboarding
$ npm install
```

* 프로젝트 루트 경로에 .env 파일 생성 후 환경 변수 설정 및 데이터베이스 생성

```.env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=?
DB_PASSWORD=?
DB_DATABASE=wanted_pre_onboarding
```

* Run and Test

```bash
$ npm run start  # 실행

$ npm run test  # 유닛 테스트
```

* 접속 : http://localhost:3000



## DB 모델링

---

## ![ERD](https://user-images.githubusercontent.com/40125372/174484935-a151215d-8589-4f4c-a1d6-2d25b1a33aa2.PNG)

* 회사에 종속되어 있는 회사명, 국가, 지역을 회사 테이블로 분리
* 회사와 채용공고는 1:N의 관계
* 사용자와 채용공고는 N:M의 관계이지만 지원내역을 단순한 연결 테이블로 한다면 매핑만 할 뿐 추가적인 요구사항에 대응하기 어렵기 때문에 별도의 테이블로 설계
* 사용자와 지원내역 1:N, 채용공고와 지원내역 1:N으로 연결하여 구현



## API 설계 

---

1. 채용공고 등록 : POST    /posts
2. 채용공고 수정 : PUT    /posts/:id
   * 채용포지션, 보상금, 사용기술, 내용 을 수정할 수 있도록 구현
3. 채용공고 삭제 : DELETE    /posts/:id
4. 채용공고 목록 : GET    /posts 
   * 쿼리스트링이 없다면 전체 목록 조회
5. 채용공고 검색 : GET    /posts?search=keyword
   * 채용공고와 채용공고를 올린 회사정보도 같이 검색될 수 있어야 하므르 Join한 후 데이터 조회
6. 채용공고 상세 : GET    /post/:id
   * 채용공고 리스트 관련 API와 달리 상세정보가 추가적으로 들어가게 함
   * 현재 공고를 제외한 회사의 다른 채용공고의 id list도 같이 응답값으로 보냄
7. 채용공고 지원 : POST    /application
   * 사용자가 1회만 지원하도록 구현

API 문서 : [https://documenter.getpostman.com/view/8003890/UzBmMT8K](https://documenter.getpostman.com/view/8003890/UzBmMT8K)



## 커밋 메세지 컨벤션

---

* Feat : 새로운 기능 추가
* Fix : 버그 수정
* Docs : 문서 수정
* Test : 테스트 코드 작성