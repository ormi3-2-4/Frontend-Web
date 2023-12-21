# Running-mate
- 달리기, 자전거 운동을 기록하고 공유하는 서비스입니다.
- 운동코스를 추천하고 운동용품 정보를 추천하는 커뮤니티

## 목차
1. [요구사항](#요구사항)
2. [기술 및 개발환경](#기술-및-개발환경)
3. [배포](#배포)
4. [ERD](#erd)
5. [프로젝트 구조](#프로젝트-구조)
6. [API 명세서](#api-명세서)
7. [화면 설계](#화면-설계)
8. [데모 라이브](#데모-라이브)
9. [관련 이슈](#관련-이슈)
10. [회고](#회고)
---

## 요구사항
### [Mindmap](https://www.mindmeister.com/app/map/3073937570?t=tdhe0WMmsK)
- 회원가입, 프로필페이지
- 운동 시작
  - 목표설정 : 거리, 페이스, 목적지
- 운동 기록 (실시간)
  - 지도에 내 위치 표시
  - 운동 진행 시간 표시
  - 현재 페이스
  - 인증샷
- 운동 기록지
  - 운동 데이터 통계 (거리, 시간, 페이스)
  - 지도에 내가 달린 거리 표시
- 운동 History (list)
- 커뮤니티
  - 운동기록 공유
- 운동용품 추천 게시판
  - 카테고리
- 달리기 코스
  - 코스 추천 작성

---

## 기술 및 개발환경
### Backend
<div>
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white">
    <img src="https://img.shields.io/badge/GDAL-5CAE58?style=for-the-badge&logo=GDAL&logoColor=white">
    <img src="https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=Mysql&logoColor=white">
</div>

### Frontend
<div>
    <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=Flutter&logoColor=white">
    <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white">
</div>

### Cloud
<div>
    <img src="https://img.shields.io/badge/Amazone_S3-569A31?style=for-the-badge&logo=AmazoneS3&logoColor=white">
</div>

### IDE & Cooperation
<div>
    <img src="https://img.shields.io/badge/Pycharm-000000?style=for-the-badge&logo=Pycharm&logoColor=white">
    <img src="https://img.shields.io/badge/visual_Studio_Code-007ACC?style=for-the-badge&logo=visualStudioCode&logoColor=white">
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>

---
## 배포

---
## ERD
![Running Mate](https://github.com/ormi3-2-4/Running-mate/assets/37658328/4e2fb501-8682-442d-b6d1-a132ca6eabb8)

## 프로젝트 구조

### Backend
```
community
 ┣ migrations
 ┣ __init__.py
 ┣ admin.py
 ┣ apps.py
 ┣ models.py
 ┣ tests.py
 ┗ views.py
 course
 ┣ migrations
 ┣ __init__.py
 ┣ admin.py
 ┣ apps.py
 ┣ models.py
 ┣ serializer.py
 ┣ tests.py
 ┣ urls.py
 ┗ views.py
 recommend
 ┣ migrations
 ┣ __init__.py
 ┣ admin.py
 ┣ apps.py
 ┣ models.py
 ┣ tests.py
 ┗ views.py
 record
 ┣ migrations
 ┣ templates
 ┃ ┗ maps.html
 ┣ __init__.py
 ┣ admin.py
 ┣ apps.py
 ┣ forms.py
 ┣ models.py
 ┣ permissions.py
 ┣ serializers.py
 ┣ tests.py
 ┣ urls.py
 ┗ views.py
 running_mate
 ┣ __init__.py
 ┣ asgi.py
 ┣ consumer.py
 ┣ settings.py
 ┣ urls.py
 ┗ wsgi.py
 user
 ┣ migrations
 ┣ __init__.py
 ┣ admin.py
 ┣ apps.py
 ┣ models.py
 ┣ serializers.py
 ┣ tests.py
 ┣ urls.py
 ┗ views.py
 .env
 .gitignore
 db.sqlite3
 manage.py
 requirements.txt
 schema.yml
```
## API 명세서
|end-point|GET|POST|PATCH|DELETE|Description|
|---|---|---|---|---|---|
|user/info|O|---|O|---|사용자 프로필|
|record|O|O|---|---|운동기록|
|record/<int:pk>|O|---|---|O|운동기록 상세|
|record/<int:pk>/finish|---|---|O|---|운동기록 종료|
|record/<int:pk>/image|---|O|---|---|인증샷|
|course|O|O|---|---|달리기 코스|
|course/<int:pk>|O|---|O|O|달리기 코스 상세|
|recommend|O|O|O|O|운동용품 추천|
|recommend/<int:pk>|O|---|O|O|운동용품 추천 상세|
|community|O|O|O|O|운동 공유 커뮤니티|
|community/<int:pk>|O|---|O|O|운동공유 커뮤니티 상세|

[swagger URL]()

---
## 화면 설계
- [Link](https://www.figma.com/file/KuQDyazSTgOMttmP3tneYV/%ED%99%94%EB%A9%B4-%EC%84%A4%EA%B3%84?type=design&node-id=0-1&mode=design&t=pgDemkq1xKR9rZeO-0)
---
## 데모 라이브
---
## 관련 이슈

- Field name username is not valid for model

원인

django-rest-auth 라이브러리에서는 기본 시리얼라이저가 셋팅되어 있습니다.
```sh
USER_DETAILS_SERIALIZER = 'rest_auth.views.UserDetailsView'
```
커스텀 유저에 username을 email 로 사용하였는데
기본 시리얼라이저에서 username을 참조하려고 해서 에러가 발생하였습니다.

해결 

다음과 같이 유저 모델을 명시하고 시리얼라이저에 username을 삭제하여 해결하였습니다.
```sh
AUTH_USER_MODEL = 'user.User'
```
---

- GPS 좌표 활용

좌표데이터들의 집합을 활용해 거리를 구하기위해 GeoDjango를 사용하였습니다.
GeoDjango는 다양한 형식의 공간 데이터를 제공하고 데이터 조작을 위한 인터페이스를 제공하며,
Django 외에 추가적인 설치사항이 요구됩니다.

1. 공간 데이터베이스
  - SQLite, MySQL, MongoDB 등 많은 RDBMS 와 NoSQL 애플리케이션이 공간 데이터베이스를 지원합니다.
  - MySQL을 채택하였기 때문에 Django ORM을 사용할 수 있습니다.
2. 지리 공간 라이브러리
  - GDAL Library 설치 하였습니다.

 djgeojson.fields.LineStringField 타입에 좌표들을 저장하였고
 이를 활용하여 좌표간의 거리를 계산하고 지도에 표시하였습니다.

---

- DateField Non-editable

models.DateTimeField에 Admin 페이지에서 생성/ 수정이 불가능한 문제가 발생하였습니다.

원인

auto_now, auto_add_now를 추가하면 editable=False 가 기본값이 되어 editable=True로 명시하여도 수정할 수 없게 되었습니다.

해결

auto_now, auto_add_now를 제거하고, 서버측에서 시간을 넣어주는 방향으로 수정하였습니다.

---
## 회고

- 박지만 : Record 앱 백엔드 담당
---
- 송대현 :
---
- 김강토 :
---
- 신호용 :

---



