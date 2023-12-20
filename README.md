# Running-mate

# 요구사항
- 회원가입, 프로필페이지
- 운동 시작
  - 목표설정 : 거리, 페이스, 목적지
- 운동 기록 (실시간)
  - 지도에 내 위치 표시
  - 운동 진행 시간 표시
  - 현재 페이스
  - 일시정지, 재개, 정지(완료) 버튼
- 운동 기록지
  - 운동 데이터 통계 (거리, 시간, 페이스)
  - 지도에 내가 달린 거리 표시
  - km당 페이스 차트 표시(?)
- 운동 History (list)
- 커뮤니티
  - 운동기록 공유
- 운동용품 추천 게시판
  - 카테고리
- 달리기 코스
  - 코스 추천 작성

# 기술 및 개발환경
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

### IDE
<div>
    <img src="https://img.shields.io/badge/Pycharm-000000?style=for-the-badge&logo=Pycharm&logoColor=white">
    <img src="https://img.shields.io/badge/visual_Studio_Code-007ACC?style=for-the-badge&logo=visualStudioCode&logoColor=white">
</div>

# ERD
![Running Mate](https://github.com/ormi3-2-4/Running-mate/assets/37658328/4e2fb501-8682-442d-b6d1-a132ca6eabb8)

# 프로젝트 구조

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
# API 명세서
api/schema/swagger-ui
api/schema/redoc

# 화면 설계

https://www.figma.com/file/KuQDyazSTgOMttmP3tneYV/%ED%99%94%EB%A9%B4-%EC%84%A4%EA%B3%84?type=design&node-id=0-1&mode=design&t=pgDemkq1xKR9rZeO-0

# 데모 라이브

