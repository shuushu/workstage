export default function Recent() {
  const gisa = [
    {
      thumb:
        "https://image.imnews.imbc.com/replay/2021/nwdesk/article/__icsFiles/afieldfile/2021/05/19/desk_20210519_201215_1_8_Large.jpg",
      link: "https://imnews.imbc.com/replay/2021/nwdesk/article/6184013_34936.html",
      tit: ` [단독] "꼭대기 층에 있을 줄 알았는데"... 숨어 있는 '옥상 출구'`,
      provider: " 김세로",
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
