# 시도/구/동 행정경계 별 데이터 전환 작업

## 도구

- 맵박스 타일 작업
- QGIS
- [센서스 행정구역(SHP) 데이터](http://data.nsdi.go.kr/dataset/20171206ds00001)
- 19대 대선 데이터
- [mapshaper](https://mapshaper.org/)
- [시도/구 shp 데이터](http://www.gisdeveloper.co.kr/?p=2332)

## 제약

맵박스 스튜디오에서 벡터 타일을 만들 때 300mb제한과 데이터 표준 규약을 따라야 한다.
행정구역 데이터가 크기 때문에 최적화(단순화) 작업이 필요하다.

읍/면/동의 경우 법정동과 행정동이 따로 존재한다. 위에 데이터는 행정동 기준 shp파일이다.

## 개발노트

1. mapshaper에서 폴리곤을 단순화 (QGIS에서도 가능) 후 shp파일로 export한다. \*[참조](https://neurowhai.tistory.com/350)

2. 단순화 시킨 shp파일을 QGIS로 불러온 후 CSV 데이터와 컬럼을 조인한다.

- [QGIS에서 데이터 조인](https://m.blog.naver.com/flyproject/222020577393)

3. 맵박스에서 타일에 사용되는 것은 위도/경도이므로, 시도/구 SHP의 맵레이어의 좌표계를 "5179"로 변경을 하고, 프로젝트 좌표계를 "EPSG:4326"로 설정한다.

- 행정동(센서스)는 "5181"로 설정한다.

4. 작업한 맵레이어를 geojson으로 export시 좌표계를 프로젝트 좌표계와 같은것으로 설정한다. 이 후 mapbox studio의 타일에서 geojson을 import한다.
