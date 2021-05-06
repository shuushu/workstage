export default function Recent() {
  const gisa = [
    {
      thumb:
        "https://cdn.kihoilbo.co.kr/news/photo/202012/899731_313585_956.jpg",
      link: "https://www.kihoilbo.co.kr/news/articleView.html?idxno=899731",
      tit:
        "여기는 괜찮을까… 옥상문 열러 갔더니 도로 내려와야 했다 여기는 괜찮을까… ",
      provider: "기호일보",
      date: "2020.12.03",
    },
    {
      thumb:
        "https://thumb.mt.co.kr/06/2020/12/2020120211338296959_1.jpg/dims/optimize/",
      link: "https://news.mt.co.kr/mtview.php?no=2020120211338296959",
      tit: "4명 숨진 군포 아파트 화재 '특이 구조'가 화 키웠나…옥상 혼동 가능성",
      provider: "뉴스1 ",
      date: "2020.12.02",
    },
    {
      thumb:
        "https://cdn.kihoilbo.co.kr/news/photo/202012/899731_313585_956.jpg",
      link: "https://www.kihoilbo.co.kr/news/articleView.html?idxno=899731",
      tit:
        "여기는 괜찮을까… 옥상문 열러 갔더니 도로 내려와야 했다 여기는 괜찮을까… ",
      provider: "기호일보",
      date: "2020.12.03",
    },
    {
      thumb:
        "https://thumb.mt.co.kr/06/2020/12/2020120211338296959_1.jpg/dims/optimize/",
      link: "https://news.mt.co.kr/mtview.php?no=2020120211338296959",
      tit: "4명 숨진 군포 아파트 화재 '특이 구조'가 화 키웠나…옥상 혼동 가능성",
      provider: "뉴스1 ",
      date: "2020.12.02",
    },
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
