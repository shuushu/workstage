import { useEffect, useState } from "react";
import SIdoTower30 from './SIdoTower30';
let ff = false
const DD = [
    ['서울', 13, 2, 0, 0, 0, 35, 2],
    ['부산', 984, 19, 0, 0, 2, 982, 19],
    ['대구', 0, 0, 0, 0, 0, 0, 0],
    ['인천', 120, 0, 0, 2, 0, 271, 0],
    ['광주', 17, 1, 0, 0, 0, 17, 1],
    ['대전', 50, 0, 0, 0, 10, 40, 0],
    ['울산', 1250, 15, 0, 5, 0, 1725, 223],
    ['세종', 3, 0, 0, 0, 0, 4, 7],
    ['경기도', 67, 7, 1, 2, 0, 348, 60],
    ['경기북부', 5, 0, 0, 0, 7, 12, 0],
    ['강원도', 6, 0, 0, 0, 0, 9, 0],
    ['충청북도', 18, 0, 0, 0, 3, 28, 11],
    ['충청남도', 0, 0, 0, 0, 0, 0, 0],
    ['전라북도', 3, 0, 0, 0, 0, 3, 0],
    ['전라남도', 17, 2, 0, 1, 3, 16, 1],
    ['경상북도', 40, 0, 0, 0, 0, 40, 0],
    ['경상남도', 32, 1, 1, 1, 0, 32, 1],
    ['제주', 0, 0, 0, 0, 0, 0, 0],
    ['창원', 0, 0, 0, 0, 0, 0, 0]
]

export default function FullWidthTabs(props) {
    const { area } = props;
    const DATA = area === 'all' ? DD : DD.filter(i => {
        return i[0] === area
    });

    const RenderTable = () => {
        return DATA.map((v1, i1) => {
            return (
                <tr className={`${v1[0]}`} key={`itme-tr-${i1}`}>
                    {v1.map((v2, i2) => {
                        return (
                            <td className={`n${i2}`} key={`itme-${i2}`} ><span>{v2}</span></td>
                        )
                    })}
                </tr>
            )
        })
    }
    useEffect(() => {
        const getChart: HTMLElement = document.querySelector('#chartdiv');
        const getNode: HTMLElement = document.querySelector('.' + area);
        if (ff) {
            document.body.scrollTo(0, getChart.offsetTop);
        }

        if (getNode) {
            document.querySelectorAll('.table tbody tr').forEach(i => i.classList.remove('active'));
            getNode.classList.add('active');
        }
    })
    useEffect(() => {
        ff = true;
    }, [])

    return (
        <div className="table-wrap">
            <table className="table">
                <thead>
                    <tr>
                        <td className="n4" colSpan={5}><span >조치내역</span></td>
                        <td className="n7" colSpan={3}><span >불량사항</span></td>
                    </tr>
                    <tr>
                        <th className="n0"><span>-</span></th>
                        <th><span>조치명령</span></th>
                        <th><span>기관통보</span></th>
                        <th><span>입건</span></th>
                        <th className="n4"><span>과태료</span></th>

                        <th><span>비상구</span></th>
                        <th><span>소방시설</span></th>
                        <th className="n7"><span>건축분야</span></th>
                    </tr>
                </thead>
                <tbody>
                    {RenderTable()}
                </tbody>
            </table>
            {area === 'all' ? null : <SIdoTower30 area={area} />}
        </div>
    );
}
