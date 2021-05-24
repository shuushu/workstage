export default function Recent() {
  const gisa = [
    {
      thumb:
        "https://image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/05/20/desk_20210520_201609_1_9_Large.jpg",
      link: "https://imnews.imbc.com/replay/2021/nwdesk/article/6185255_34936.html",
      tit: `소방서는 "열어놔라" 경찰은 "잠가라"…무용지물 '대피소'`,
      provider: "남재현",
      date: "2021-05-20 20:18",
    },
    {
      thumb:
        "https://image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/05/20/desk_20210520_201154_1_8_Large.jpg",
      link: "https://imnews.imbc.com/replay/2021/nwdesk/article/6185254_34936.html",
      tit: `[집중취재M] '옥상 대피' 성공해도…문 열면 비탈 지붕에 낭떠러지`,
      provider: "백승우",
      date: "2021-05-20 20:14",
    },
    {
      thumb:
        "https://image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/05/19/desk_20210519_201215_1_8_Large.jpg",
      link: "https://imnews.imbc.com/replay/2021/nwdesk/article/6184013_34936.html",
      tit: ` [단독] "꼭대기 층에 있을 줄 알았는데"... 숨어 있는 '옥상 출구'`,
      provider: "김세로",
      date: "2021-05-19 20:35",
    }  
  ];

  const RenderExample = () => {
    return gisa.map((items, i) => {
      const { thumb, link, tit, provider, date } = items;
      return (
        <li key={`itmes-${i}`} className="items-wrap">
          <a
            href={link}
            className="itmes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="thumb">
              <img src={thumb} alt="" />
            </span>
            <span className="info">
              <span className="ell">{tit}</span>
              <span className="date">
                [{provider}]<em>{date}</em>
              </span>
            </span>
          </a>
        </li>
      );
    });
  };
  return (
    <div className="recent">
      <div className="wrap">
        <h3>관련 뉴스</h3>
        <ul className="items-container">
          <RenderExample />
        </ul>
      </div>
    </div>
  );
}
