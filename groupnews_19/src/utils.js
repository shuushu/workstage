
const tooltip = (data) => {
    const { 정당, 면적, 소유주, 신고가액, 이름, 종류, 주소_with면적, 취득경위, 취득시점 } = data;
    return `
        <div class="custom-layer-tooltip">
            <div class="wrap">
                <h5 class="headline">
                    <span class="당마크 ${정당}_로고_30x30"></span>${이름}
                    <span class="기타정보">
                        <span class="소유주">소유주: ${소유주}</span><span class="종류">${종류}</span>
                    </span>
                </h5>
                <p class="parag">
                    <span class="취득정보">[${취득시점}-${취득경위}] </span>                
                    ${주소_with면적}
                </p>
                    <p class="parag"></p>
                    <p class="parag"></p>

            </div>
        </div>
    `
}


export { tooltip }
