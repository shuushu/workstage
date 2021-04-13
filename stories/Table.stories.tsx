import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FetchApi } from '../components/FetchApi';
import { ItemCard } from '../components/Items';
import { useFetch } from '../hooks/useFetch';

import SortTable from '../components/SortTable';
import { 옥상출입문실태조사 } from "../example/staticData/옥상출입문실태조사";

export default {
  title: 'Table/SortTable',
  component: SortTable
} as Meta;

const TemplateSort: Story = (args) => {
  return <SortTable {...args} />
}
export const 정렬테이블 = TemplateSort.bind({});
정렬테이블.args = {
  DATA_HEAD: [
    { id: '건축허가일', numeric: false, disablePadding: false, label: '건축허가일' },
    { id: '사용승인일', numeric: false, disablePadding: false, label: '사용승인일' },
    { id: '동수', numeric: true, disablePadding: false, label: '동수' },
    { id: '지붕형태', numeric: false, disablePadding: false, label: '지붕형태' },
    { id: '옥상 대피공간', numeric: false, disablePadding: false, label: '옥상<br>대피공간' },
    { id: '옥상출입문 설치여부', numeric: false, disablePadding: false, label: '옥상출입문<br>설치여부' },
    { id: '옥상 출입문 위치', numeric: false, disablePadding: false, label: '옥상<br>출입문<br>위치' },
    { id: '옥상 출입문 재질', numeric: false, disablePadding: false, label: '옥상<br>출입문<br>재질' },
    { id: '옥상 출입문 개방관리', numeric: false, disablePadding: false, label: '옥상<br>출입문<br>개방관리' },
    { id: '유도등 설치여부', numeric: false, disablePadding: false, label: '유도등<br>설치여부' },
    { id: '점등상태', numeric: false, disablePadding: false, label: '점등상태' },
    { id: '자동개폐장치 작동상태', numeric: false, disablePadding: false, label: '자동개폐장치<br>작동상태' },
    { id: '대피공간내 난간설치', numeric: false, disablePadding: false, label: '대피공간내<br>난간설치' },
    { id: '대피공간 면적', numeric: true, disablePadding: false, label: '대피공간<br>면적' },
    { id: '장애요인', numeric: false, disablePadding: false, label: '장애요인' },
    { id: '장애내용', numeric: false, disablePadding: false, label: '장애내용' },
    { id: '참고사항', numeric: false, disablePadding: false, label: '참고사항' }
  ],
};

