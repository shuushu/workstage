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

* [demo](http://nz.assembly-mbc.com/)
