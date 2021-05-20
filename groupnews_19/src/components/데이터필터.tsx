import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom"; // https://reactrouter.com/web/guides/quick-start
import Chip from "@material-ui/core/Chip";



// Import Swiper React components
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";


// pages
import { List } from "../pages/List.tsx";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

import { setDataPerson } from "../asset/data/person";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);
const M = window.innerWidth <= 600;
const g: any = global;
// 의원 아이템 리스트 렌더링
let timer;

// 새로고침 시 URL로 필터 타입 구하기
const getType = () => {
    const params = decodeURI(g.location.hash.substr(3));

    if (params === '더불어민주당' || params === '국민의힘' || params === '정의당' || params === '열린민주당' || params === '무소속' || params === '국민의당' || params === '기본소득당' || params === '시대전환') {
        return 'party_new';
    } else if (params === '') {
        return 'all'
    } else {
        return 'name'
    }
}
const ResultSearchItem = (props) => {
    const { className, rePaint, handleClick, setFilterData, setSerchValue, sortType } = props;
    const { name } = useParams();
    const { state } = useLocation();
    const type = (state && state.type) ? state.type : getType();
    const getData = name ? setFilterData({ type, value: name.substr(1) }) : setDataPerson;
    clearTimeout(timer);
    timer = setTimeout(() => {
        rePaint(getData);
    }, 0);

    useEffect(() => {
        setSerchValue(name);
        if (g.flick) {
            g.flick.update();
        }
    });

    const items = (v, i) => {
        // 마커ID를 찾기 위해 PK키 생성
        const 토지키 = v.estate.map(v => `${v.index}_${v.index_2}`)
        return (
            <List
                {...v}
                handleClick={handleClick}
                size={getData.length - 1}
                type={type}
                urlParams={name}
            >
                { v['가격랭크'] !== null && <Chip onClick={() => { }} className={`랭킹 n${i}`} size="small" label={`총 신고가액 ${v['가격랭크']}위`} />}
                { v['넓이랭크'] !== null && <Chip color="primary" onClick={() => { }} className={`랭킹 n${i}`} size="small" label={`면적 기준 ${v['넓이랭크']}위`} />}
                { v['평당랭크'] !== null && <Chip color="secondary" onClick={() => { }} className={`랭킹 n${i}`} size="small" label={`평당가격 ${v['평당랭크']}위`} />}
            </List>
        );
    };

    const itemRender = () => {
        let DATA;
        if (sortType !== 'all') {
            let typeMapping;
            switch (sortType) {
                case '보유수': typeMapping = '농지수';
                    break;
                case '총필지면적': typeMapping = '총농지필지_m';
                    break;
                case '필지가격': typeMapping = '농지필지_원';
                    break;
                case '평당가': typeMapping = '평균평당가격(농지)';
                    break;
                default: typeMapping = '';
                    break;
            }
            DATA = [...getData].sort((a, b) => {
                if (a[typeMapping] > b[typeMapping]) {
                    return -1;
                }
                if (a[typeMapping] < b[typeMapping]) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });
        } else {
            DATA = getData;
        }

        if (M && (type === 'party_new' || type === 'name')) {
            let arr = [];
            DATA.forEach(p => {
                if (p.estate.length > 1) {
                    p.estate.forEach(v => {
                        arr.push({ ...p, estate: [v] })
                    })

                } else {
                    arr.push(p)
                }
            })
            DATA = arr;
        }

        return DATA.map((v, i) => {
            if (M) {
                return (
                    <SwiperSlide key={`list-wrap#${i}`}>
                        <div className={className ? `swiper-slide-items list search` : `swiper-slide-items list`} style={DATA.length <= 1 ? { width: g.innerWidth - 20 } : { width: g.innerWidth - 60 }} >{items(v, i)}</div>
                    </SwiperSlide>
                );
            } else {
                return (
                    <div key={`list-wrap#${i}`} className={className ? "list search" : "list"} >{items(v, i)}</div>
                );
            }
        });
    };

    const showContainer = () => {
        // 모바일일때 
        if (M) {
            return (
                <Swiper
                    spaceBetween={10}
                    autoHeight={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    // onSlideChange={(i) => console.log(i)}
                    onSwiper={(swiper) => (g.flick = swiper)}
                >
                    {itemRender()}
                </Swiper>
            );
        } else {
            return itemRender();
        }
    }


    return showContainer();
};

export { ResultSearchItem }