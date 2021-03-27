import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import {useLocation} from "react-router";


const g: any = global;
const kakao: any = g.kakao;
const Detail = (props) => {    
    const {  이름, 정당, 소유주, 전체,주소_with면적, 비고, 비중,size, 좌표, 지역구, 종류,취득시점, 취득경위,신고가액 } = props;
    const { state } = useLocation();
    const [ value, setValue ] = useState(0);
    const sizeValue = state && state.size ? state.size : size;

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
                document.querySelector('.detail').removeChild(document.getElementById('roadview'))
            }   
        });
        setTimeout(() => {
            setValue(Math.round(비중*10000 / 100))
        }, 0)
    }, []);
    
  return (
      <Paper className="detail">
          <div className="헤드라인">
              
              <div className="정보">                  
                  <span className={`thumb ${정당}`}>
                      <img src="https://picsum.photos/200/200" alt=""/>
                  </span>
                  <div className="기본정보묶기">
                      <div className="wrap1">
                          
                          <span className="이름">{이름}</span>
                          <span className="소유주">소유주: {소유주} / {종류}</span>
                      </div>
                      <div className="wrap2">
                          <span className="지역구">{정당} {지역구 }</span>
                      </div>
                  </div>
                  
                  
                  
              </div>
              
              <div className="주소감싸미">
                  [{취득시점}-<strong>{취득경위}</strong>]
                  <span className="주소">{주소_with면적}{sizeValue >= 1 ? `외  ${sizeValue}개 농지 소유` : ''}</span>                      
              </div>
              <div className="지분">
                  <span className="게이지">
                      <span className="막대" style={{width: `${value}%`}}></span>
                  </span>
                  <span className="비중">지분: {비중 < 1 ? (비중).toFixed(3) : 100}%</span>
                  
              </div>
              <p>신고가액: {신고가액}</p>
              <p>전체: {전체}</p>
              <p>비고: {비고}</p>
              
              
              
              

            <IconButton aria-label="뒤로 돌아가기" className="back" onClick={() => g.history.back()}>
                <ArrowForwardIos />
            </IconButton>
          </div>
          <div id="roadview"></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ab voluptatum vero cupiditate! Fugiat vel aut dolorem dolores fugit ipsum iusto. A earum vero possimus nulla, neque dolore laborum accusantium.
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam excepturi quis sapiente magni ipsum architecto quasi officiis aperiam, neque autem veritatis accusantium doloremque molestiae ducimus unde distinctio, facere fugiat sunt.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ab voluptatum vero cupiditate! Fugiat vel aut dolorem dolores fugit ipsum iusto. A earum vero possimus nulla, neque dolore laborum accusantium.
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam excepturi quis sapiente magni ipsum architecto quasi officiis aperiam, neque autem veritatis accusantium doloremque molestiae ducimus unde distinctio, facere fugiat sunt.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ab voluptatum vero cupiditate! Fugiat vel aut dolorem dolores fugit ipsum iusto. A earum vero possimus nulla, neque dolore laborum accusantium.
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam excepturi quis sapiente magni ipsum architecto quasi officiis aperiam, neque autem veritatis accusantium doloremque molestiae ducimus unde distinctio, facere fugiat sunt.
      </Paper>
    );
}

export { Detail }