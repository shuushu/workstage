# 집합건물 옥상 소방 안전 실태 조사

## 도구

- [marzipano](https://www.marzipano.net/)
- [도로명주소api](https://www.juso.go.kr/addrlink/devAddrLinkRequestGuide.do?menu=roadApi)
- 정제 데이터
- 360촬영

## 개발노트

- 도로명 주소api의 응답값에 우편번호 코드와 정제 데이터의 집합건문의 우편 번호를 맵핑시켜 서비스 제공
- 360장비가 없어 휴대폰 파노라마로 촬영하여 제작 하였는데, 상/하 일그러짐이 심하여 라이브러리 코드에서 좌/우로만 이동가능하게 편집
  [https://github.com/shuushu/workstage/blob/0bbe15af713d9a841db0536e2449dab88368b050/groupnews_20/src/panorama/index.js#L372]

- 소방청에서 받은 데이터 정제에 힘이 들었다. (주소 및 아파트명 오류, 누락) 데이터 검색 정확도를 높이기 위해 카카오 주소api, 호갱노노 api, 구글 검색 api로 대조하면서 데이터를 가공했다.
- 개발에 연동했던 구글 시트가 배포시에 export is not defined 오류가 발생했었다. 이유는 commonjs 모듈이 디펜던시에 사용하고 있었는데 바벨에서 알려주어야 했다. (CRA eject하지 않으명 괜찮았다 - 확인 완료) webpack설정 변경 후 이슈는 해결되었다. [참고](https://github.com/shuushu/workstage/blob/f7df55798fbb0abbce81cb0baa6c4e4a84b25c43/config/webpack.config.js#L403) 

* [demo](http://fire.assembly-mbc.com/)
