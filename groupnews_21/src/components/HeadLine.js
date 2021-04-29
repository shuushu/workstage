import React from "react";

const data = [
  {
    link:
      "https://imnews.imbc.com/replay/2021/nwdesk/article/6162809_34936.html?menuid=",
    src:
      "//image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/04/28/desk_20210428_202007_1_12_Large.jpg",
    str: `국회의원은 본 회의든 상임 위원회든 성실하게 참석할 의무가
        있습니다. 가장 기본적인 의정 활동이죠. 만약, 무단으로 결석하면
        특별 활동비를 깎고 징계까지 가능한, 장치도 만들어 놓았습니다.
        그런데 여기에 큰 구멍이 있고 의원들은 그걸 잘 알고 있습니다.`,
    provider: "장슬기",
  },
  {
    link:
      "https://imnews.imbc.com/replay/2021/nwdesk/article/6162810_34936.html?menuid=",
    src:
      "//image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/04/28/desk_20210428_202132_1_13_Large.jpg",
    str: `의원님은 구속돼도 월급 그대로…고칠지 물었더니? 정정순 의원은 특별 활동비를 반납 하겠다고 했습니다. 하지만 구속 기간에 받은 월급에는 말이 없습니다. 오늘 구속된 이상직 의원도 월급은 다 받습니다. 하지만 다른 공무원은 그렇지 않습니다. 이제 의원들도 구속되면 월급을 깎자는 법안이 국회에 올라와 있는데`,
    provider: "백승우",
  },
];

export default function HeadLine() {
  const drawVideo = (data) => {
    return data.map((d, i) => {
      const { link, src, str, provider } = d;
      return (
        <a
          href={link}
          target="_blank"
          key={`list-video-${i}`}
          relel="noreferrer"
        >
          <span className="thumb">
            <img src={src} alt="" />
          </span>
          <span className="str">{str}</span>
          <span className="provider">{provider}</span>
        </a>
      );
    });
  };
  return (
    <div className="headline">
      <h1>꼬박꼬박 결석신고한 이유는? 출석부의 비밀</h1>
      <p className="parag">
        국회의원 출석부에는 비밀이 있습니다. 회의를 얼마나 빠졌는지 알려면{" "}
        <strong>무단 결석</strong> 횟수만 세서는 안 된다는 겁니다.
      </p>
      <p className="parag">
        결석하더라도 사유를 적어 국회의장에게{" "}
        <strong className="comma">청가서</strong> 나{" "}
        <strong className="comma">결석계</strong>를 내면 출석으로 인정받기
        때문인데요.
      </p>
      <p className="parag">
        진단서 같은 첨부서류를 낼 필요도 없고 검증도 없어 무조건 허가됩니다.{" "}
        <br />
        그러니까{" "}
        <strong className="comma">불출석 = 무단 결석 + 청가 및 결석계</strong>인
        겁니다.
      </p>
      <div className="parag">
        21대 국회가 문 연 작년 6월부터 올해 3월 말까지 출결 현황을 살펴봤습니다.
        <div className="layer-wrap">
          <strong className="news-emoji">&#127910; 관련 뉴스 보기</strong>
          <div className="layer">{drawVideo(data)}</div>
        </div>
      </div>
      <footer id="footer">
        &#9997;
        <a
          href="https://news.imbc.com/newszoomin/groupnews/"
          relel="noreferrer"
          target="_blank"
        >
          기획: MBC기획취재팀
        </a>
        <span>시각화/디자인: 최훈철</span>
        <span>리서처: 김민경, 정다현, 구나연, 이승주</span>
        <span>
          제보/문의:{" "}
          <a href="mailto:seul@mbc.co.kr">
            seul@mbc.co.kr (데이터전문기자 장슬기)
          </a>
        </span>
      </footer>
    </div>
  );
}
