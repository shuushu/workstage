import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { customData } from "../asset/data/person.js";


const 정당별토지카운터 = (props) => {
    const { setSort } = props;
    const { 카운터 } = customData;
    const history = useHistory();
    const handleClick = (정당) => {
        setSort('all');
        history.push({
            pathname: `/:${정당}`,
            state: { type: 'party_new' }
        });
    };

    const show = () =>
        Object.entries(카운터).map(([키, 값], i) => {
            return (
                <li className="items" key={`카운터-${i}`}>
                    <Button className="버튼" onClick={() => handleClick(키)}>
                        <span className="wrapping">
                            <span className={`로고 ${키}_로고_30x30`}></span>
                        </span>

                        {/* <img
                                src={`//nz.assembly-mbc.com/static/imgs/party_logo/${키}_thumb.png`}
                                alt=""
                            /> */}
                        <div className={`wrap  ${키}`}>
                            <span className={`카운터`}>{값.total2}<span className="total">{값.total}</span></span>
                            <span className="키이름">{키}</span>
                        </div>
                    </Button>
                </li>
            );
        });
    return (
        <>

            <h5 className="타이틀">정당별 농지 소유 의원수</h5>
            <ul>{show()}</ul>
        </>
    );
};

export { 정당별토지카운터 }