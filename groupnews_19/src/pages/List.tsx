import React from 'react';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from "@material-ui/core/Chip";

// icons
import Spa from "@material-ui/icons/Spa"; //Spa 꽃 [전]
import Nature from "@material-ui/icons/Nature"; // Nature r과수원[나무]
import Language from "@material-ui/icons/Language"; // Language [답]
import FaceIcon from "@material-ui/icons/Face";

const g: any = global;
const List = (props) => {
    const { name, party_new, region2, handleClick, index, index_2, size, children, type } = props;
    const 농지소유여부 = props.estate.length > 0;
    const history = useHistory();
    const pk = `${index}_${index_2}`;

    const clickMark = (농지키) => {
        if (handleClick) {
            //검색된 의원에서 클릭이벤트 발생 할 경우
            const position = g.mapObj[농지키].marker.getPosition();
            handleClick(position);
            g.mapObj[농지키].customOverlay.setMap(g.window.map);

            setTimeout(() => {
                // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                g.roadviewClient.getNearestPanoId(position, 50, function (panoId) {
                    if (panoId) {
                        g.roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
                    } else {
                        //document.querySelector('.detail').setAttribute('style', 'display:none')
                    }
                });
            }, 1000)

            // URL파라미터 타입
            history.push({
                pathname: `/detail/:${농지키}`,
                state: { size: size }
            });
        } else {
            history.push(`/:${name}`);
        }
    }
    const GetEstate = (농지데이터) => {
        const { add, area_whole } = 농지데이터;
        const count = props.estate.length;


        if (농지소유여부) {
            return (
                <div>
                    <span>
                        {add}
                        <span className="면적">{`(${area_whole} ㎡)`}</span>
                        {type === 'all' ? (
                            <span className="소유">{`${count === 1 ? '' : `외 ${count - 1}소유`}`}</span>
                        ) : ''}
                    </span>
                </div>
            )
        } else {
            return < div >농지를 소유하고 있지 않습니다</div>
        }
    }
    const RenderListItems = () => {
        // 전체의원보기-중복은 제거하고 array[0]만 고정으로 노출
        let 토지배열 = (type === 'all') ? [props.estate[0]] : props.estate;
        // 모바일 케이스 - 정당별 보기
        if (g.isM && type === 'party_new') {

        }

        return 토지배열.map(농지데이터 => {
            const {
                cate = "본인",
                cate2 = "답",
                index = 1,
                index_2 = 1,
                pk,
                value = "19,801,000원",
                취득방법 = "상속",
            } = 농지데이터;

            const TypeView = () => {
                switch (cate2) {
                    case "전":
                        return <Spa />;
                    case "답":
                        return <Language />;
                    case "과수원":
                        return <Nature />;
                }
            };

            return (
                <Card className={농지소유여부 ? 'list 전체보기' : 'list'} key={`후보자-카드리스트-${index}-${index_2}`}>
                    <CardActionArea className="wrap" onClick={() => clickMark(pk)}>
                        <클릭알맹이 {...농지데이터} />
                    </CardActionArea>
                    <CardActions>
                        {children}
                        <div className="랭크및라벨">
                            <Chip
                                className="비중조절"
                                icon={<TypeView />}
                                size="small"
                                title={`종류: ${cate2}`}
                                label={cate2}
                                variant="outlined"
                            />
                            {취득방법 && <Chip
                                size="small"
                                label={취득방법}
                                title="취득방법"
                                variant="outlined"
                            />}

                            <Chip
                                size="small"
                                icon={<FaceIcon />}
                                title={`소유주: ${cate}`}
                                label={cate}
                                variant="outlined"
                            />
                            <Chip
                                size="small"
                                label={`신고가액: ${value}`}
                                variant="outlined"
                            />
                        </div>
                    </CardActions>
                </Card >
            )
        })
    }

    const 클릭알맹이 = (props) => {
        return (
            <>
                <div className={`의원사진랩핑 thumb ${party_new}`}>
                    <span className={`의원사진 hm${index}`}></span>
                    {/* <CardMedia component="img" alt="" height="140" image={`//image.imnews.imbc.com/newszoomin/groupnews/groupnews_19/imgs/person/${index}.jpeg`} /> */}
                </div>
                <CardContent >
                    <Typography gutterBottom variant="h6" component="h5">
                        <span className={`당마크`}>
                            <span className={`로고 ${party_new}_로고_30x30`}></span>
                            {/* <img src={`//nz.assembly-mbc.com/static/imgs/party_logo/${party_new}_thumb.png`} alt="" /> */}
                        </span>{name}<span className="지역구">{region2}</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <GetEstate {...props} />
                        {/* <span className="보유수">{customData['카운터'][party_new][name]</span> */}
                        {/* <span className="가액변동">
                                {가액변동값 ? (가액변동값 > 0) ? <>가액변동:<ArrowUpward />{가액변동값}</> : <>가액변동:<ArrowDownward />{가액변동값}</> : ''}
                            </span> */}
                    </Typography>
                </CardContent>
            </>
        )
    }




    return (
        <>
            <div className="list-items">
                {농지소유여부 ? <RenderListItems /> :
                    <Card className="list 농지무소유">
                        <CardContent className="wrap "><클릭알맹이 /></CardContent>
                    </Card>
                }
            </div>
        </>
    );
}
export { List }