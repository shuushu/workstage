import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useHistory } from "react-router-dom";

const g: any = global;
export default function ImgMediaCard(props) {
    const { pk, 이름, 주소_with면적, 정당,  지역구, children, handleClick, index, size} = props;
    const history = useHistory();
    const clickMark = () => {
        if (handleClick) {
            // 검색된 의원에서 클릭이벤트 발생 할 경우
            const position = g.state[index].marker.getPosition();
            handleClick(position);
            g.state[index].customOverlay.setMap(g.window.map);

            setTimeout(() => {
                // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                console.log('search', g.roadviewClient);
                g.roadviewClient.getNearestPanoId(position, 50, function (panoId) {
                    if (panoId) {
                        g.roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
                    } else {
                        //document.querySelector('.detail').setAttribute('style', 'display:none')    
                    }   
                });                        
            }, 1000)        

            history.push({
                pathname: `/detail/:${pk}`,
                state: {size: size}
            });
        } else {
            history.push(`/:${이름}`);
        }    
    }
    
    return (
        <>
    <Card className="list-itmes">
        <CardActionArea className="wrap" onClick={clickMark}>
            <div className={ `thumb ${정당}` }><CardMedia component="img" alt="" height="140" image="https://picsum.photos/250/250" /></div>
            <CardContent>
                        <Typography gutterBottom variant="h6" component="h5"><span className={`당마크 ${정당}_로고_30x30`}></span>{이름}<span className="지역구">{지역구}</span></Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{ 주소_with면적 } </Typography>
            </CardContent>
      </CardActionArea>
        <CardActions>{children}</CardActions>
    </Card>
        </>
      

  );
}
