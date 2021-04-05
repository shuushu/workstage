import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const g: any = window;
export default function BasicButtonGroup(props) {
    const { setSort, sort } = props;
    const handleClick = (type) => {
        setSort('all');
        window.location.href = `${type}`
    }
    const handleSort = (v) => {
        const params = decodeURI(g.location.hash.substr(3));


        if (params === '더불어민주당' || params === '국민의힘' || params === '정의당' || params === '열린민주당' || params === '무소속' || params === '국민의당' || params === '기본소득당' || params === '시대전환') {

        } else {
            window.location.href = `#`
        }

        setSort(v);
    }

    return (
        <div className={`${sort} 필터버튼`}>
            <ButtonGroup aria-label="outlined primary button group">
                <Button onClick={() => handleClick('#')}>의원전체</Button>
                <Button onClick={() => handleSort('보유수')}>보유필지순</Button>
                <Button onClick={() => handleSort('총필지면적')}>면적순</Button>
                <Button onClick={() => handleSort('필지가격')}>가액순</Button>
                <Button onClick={() => handleSort('평당가')}>평당가순</Button>
            </ButtonGroup>
        </div>
    );
}
