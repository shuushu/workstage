import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


import { 답변, 원본답변PDF } from '../asset/data/질의답변';
import { 계획서자료 } from '../asset/data/계획서자료';
import { 평수계산, 콤마제거, 콤마추가, 줄바꿈처리 } from '../utils'
const g: any = global;
const kakao: any = g.kakao;
const Detail = (props) => {
    const { name, party_new, index, region2, 토지인덱스 } = props;
    const {
        area_portion = "100%",
        area_whole = "1,868.00", // 총면적
        area_have, // 총면적중 423㎡   
        cate = "본인",
        cate2 = "답",
        pk = "1_1",
        value = "19,801,000원",
        좌표 = { La: 126.4904642, Ma: 35.37215259 },
        공유자수 = "상속",
        취득일자 = "1991.05.13",
        add,
        취득방법,
        취득연도,
        취득방법_clean,
        취득자격증,
        경영계획서
    } = props.estate[토지인덱스];


    useEffect(() => {
        const roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
        const roadview = g.roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
        const roadviewClient = g.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
        const position = new kakao.maps.LatLng(좌표.Ma, 좌표.La);

        // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
        roadviewClient.getNearestPanoId(position, 50, function (panoId) {
            if (panoId) {
                // 로드뷰에 올릴 마커를 생성합니다.
                setTimeout(() => {
                    // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 조정 합니다.
                    const projection = roadview.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
                    const rMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(좌표.Ma, 좌표.La), // 지도의 중심좌표에 올립니다.
                        map: roadview //map 대신 rv(로드뷰 객체)로 설정하면 로드뷰에 올라갑니다.
                    });
                }, 1000);

                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행               
            } else {
                if (document.getElementById('roadview') && document.querySelector('.detail')) {
                    document.querySelector('.detail').removeChild(document.getElementById('roadview'))
                }
            }
        });
        // 답변뷰
        답변뷰(props);
        비고(props);
    }, []);

    /* const createLabel = (props) => {
        return ['농지법대상', '취득자격증', '경영계획서'].map((v, i) => {
            return <Chip className={`${props[v] === 'TRUE' ? 'MuiChip-colorPrimary' : 'default'}`} key={`라벨-${i}`} label={`${v} ${props[v] === 'TRUE' ? '해당' : '아님'}`} />
        })
    } */
    const 전체평수: any = 평수계산(area_whole);

    const 답변뷰 = (props) => {
        const { name } = props;
        if (답변[index] && 답변[index]['답변 수신 여부'] === 'O') {
            document.querySelector('.답변뷰').appendChild(줄바꿈처리(답변[index]['답변_원문']));
        } else {
            document.querySelector('.답변뷰').innerHTML = `${name} 의원은 아직 답변하지 않았습니다.`
        }
    }
    const 비고 = (props) => {
        const { name, party_new } = props;
        if (답변[index] && 답변[index]['답변 수신 여부'] === 'O') {
            document.querySelector('.비고').appendChild(줄바꿈처리(답변[index]['비고']));
        } else {
            //document.querySelector('.비고').innerHTML = `${name} ${party_new}의원은 취득사유를 밝혀오지 않았습니다.`
        }
    }

    const 영농계획뷰 = () => {
        const { 사유, 노동력 } = 계획서자료[pk];
        const target = 계획서자료[pk];
        if (취득연도 < 1996 && 취득방법_clean === '상속') {
            return (
                <div className="context 영농계획뷰">
                    해당 필지는 1996년 농지법 시행 이전에 상속받은 땅으로 농지취득자격증명서와 농업경영계획서를 제출하지 않아도 됩니다.
                </div>
            )
        } else if (취득연도 >= 1996 && 취득방법_clean === '상속') {
            return (
                <div className="context 영농계획뷰">
                    해당 필지는 상속받은 땅으로 농지취득자격증명서와 농업경영계획서를 제출하지 않아도 됩니다.
                </div>
            )
        } else {
            if (취득자격증 === 'FALSE' && 경영계획서 === 'FALSE') {
                return (
                    <div className="context 영농계획뷰">
                        {사유} 를 이유로 농지취득자격증명서와 농업경영계획서를 제출하지 않았습니다.
                    </div>
                )
            } else if (취득자격증 === 'TRUE' && 경영계획서 === 'FALSE') {
                return (
                    <div className="context 영농계획뷰">
                        <span className="강조">{name}</span>의원이 {취득연도} 년에 제출한 농지취득자격증명서에 따르면 {target["취득 목적"]} 을 / 를 위해 해당 필지를 취득했습니다. <br />
                        {사유}  를 이유로 농업경영계획서를 제출하지 않았습니다.
                        <div>* 자세한 내용은 농지취득자격증명서(클릭)를 참고하세요.</div>
                    </div>
                )
            } else if (취득자격증 === 'TRUE' && 경영계획서 === 'TRUE') {

                return (
                    <div className="context 영농계획뷰">
                        <span className="강조">{target["취득 목적"]} </span>을 위해 농지를 취득하겠다고 밝힌
                        <span className="강조">{name}</span>의원는
                        <span className="강조">{target["영농 착수 시기"]} </span>부터
                        <span className="강조">{노동력}</span>으로 <span className="강조">{target["영농 착수 시기"]}</span>농사 를 지을 예정이라고
                        <span className="강조">{취득연도}</span>에 농업경영계획서를 제출했습니다.
                        <div className="장비보유">
                            농업 장비로는 <span className="강조"> {target["장비 보유현황"] === '' ? '-' : target["장비 보유현황"]}</span>을 갖고 있으며
                                <span className="강조"> {target["장비 보유계획"] === '' ? '-' : target["장비 보유계획"]}</span>을 <span className="강조"> {target["장비 보유계획2"] === '' ? '-' : target["장비 보유계획2"]}</span>로 마련할 계획이라고 밝혔습니다.
                            <div>* 자세한 내용은 <a href={`//image.imnews.imbc.com/newszoomin/groupnews/groupnews_19/nc/${index}.pdf`}>농지취득자격증명서</a>과 <a href={`//image.imnews.imbc.com/newszoomin/groupnews/groupnews_19/gh/${index}.pdf`}>농업경영계획서</a>를 참고하세요.</div>
                        </div>
                    </div>

                );
            } else {
                return <></>
            }
        }
    }

    return (
        <Paper className="detail">
            <div className="헤드라인">

                <div className="정보">
                    <span className="thumb-wrap">
                        <span className={`thumb ${party_new}`}>
                            <span className={`의원사진 hm${index}`}></span>
                            {/* <img src={`//image.imnews.imbc.com/newszoomin/groupnews/groupnews_19/imgs/person/${index}.jpeg`} alt="" /> */}
                        </span>
                    </span>
                    <div className="기본정보묶기">
                        <div className="wrap1">

                            <span className="이름">{name}</span>
                            <span className="소유주">소유주: {cate} / {cate2}</span>
                        </div>
                        <div className="wrap2">
                            <span className="지역구">{party_new} {region2}</span>
                        </div>
                    </div>
                </div>
                <div className="주소감싸미">
                    <span className="주소">
                        {add} <br />지분: {area_portion}
                    </span>
                </div>
                <IconButton aria-label="뒤로 돌아가기" className="back" onClick={() => g.history.back()}>
                    <ArrowForwardIos />
                </IconButton>
            </div>

            {/* <div className="농지법라벨">
                {createLabel(props.estate[토지인덱스])}
            </div> */}

            <ul className="텍스트리스트">
                <li>취득일자: {취득일자} </li>
                <li>취득방법: {취득방법} ({공유자수 === 1 ? '단독소유' : `공유자수: ${공유자수}`})</li>
                <li>면적: {area_have}㎡ ({평수계산(area_have)}평)</li>
                <li>신고가액: {value}  (3.3㎡ 당 {콤마추가(Math.ceil(콤마제거(value) / 전체평수))}원)</li>
                {props.estate.length > 1 ? (<li>{`해당 토지 포함 농지 총 필지 ${props.estate.length}소유`}</li>) : ''}
            </ul>
            <div id="roadview"></div>




            <h3 className="소제목"><ZoomInIcon />취득사유 및 활용계획</h3>
            <div className="context 답변뷰"></div>
            <p className="답변link"></p>
            <div className="context 비고"></div>

            {계획서자료[pk] && (
                <>
                    <h3 className="소제목"><ZoomInIcon />영농 계획</h3>
                    <영농계획뷰 />
                </>
            )}
            {
                (원본답변PDF[index] && 원본답변PDF[index]['답변_link']) && (
                    <div className="답변원문">
                        <Button variant="contained" onClick={() => {
                            window.open(`//image.imnews.imbc.com/newszoomin/groupnews/groupnews_19/q_pdf/${index}.pdf`);
                        }} disableElevation startIcon={<CloudDownloadIcon />}>답변서 다운로드</Button>
                    </div>
                )
            }


            <div className="뒤로가기">
                <Button variant="contained" fullWidth disableElevation onClick={() => g.location.href = `/#:${name}`}>
                    {name}의원이 소유한 다른 농지 보러가기
            </Button>
            </div>
        </Paper >
    );
}


export { Detail }