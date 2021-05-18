import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import DATA from "./data";
import { GoogleSpreadsheet } from 'google-spreadsheet';

let timer;
const g = window;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

async function load(si) {
    const doc = new GoogleSpreadsheet('1vh7OnmmDaY2mOXSMTaNuF6vcMVu2GYuno_GepuusRME');
    // await doc.useServiceAccountAuth({
    //     client_email,
    //     private_key
    // });
    await doc.useApiKey('AIzaSyBudarQhMv3AL0900S8zFiM2HN7UaEu5_A');    
    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsByTitle[si]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    // read rows
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    return rows
}

export default function Asynchronous(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [feieldHelpText, setFieldHelpText] = React.useState('');
    //const textRef = React.useRef();
    const [loading, setLoading] = React.useState(false);
    const [tValue, setTValue] = React.useState('');
    const {setMdFlag, setData} = props;

    function callAPI(v) {
        clearTimeout(timer);

        if (v.length > 2) {
            timer = setTimeout(() => {
                (async () => {
                    g.KAKAO.keywordSearch(v, placesSearchCB);
                    setFieldHelpText('검색중');

                    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
                    function placesSearchCB(data, status) {
                        if (status === g.kakao.maps.services.Status.OK) {
                            if (data.length > 0) {
                                setOptions(data);
                            } else {
                                setFieldHelpText('검색 결과 없음');
                            }
                        } else {
                            setFieldHelpText('검색 결과 없음');
                        }

                    }        
                })();
            }, 300)
        } else {
            setOptions([]);
        }
    }

    React.useEffect(() => {
        clearTimeout(timer);
        
        if (tValue.length > 2) {
            timer = setTimeout(() => {
                (async () => {
                    g.KAKAO.keywordSearch(tValue, placesSearchCB);
                    setFieldHelpText('검색중');

                    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
                    function placesSearchCB(data, status) {                
                        if (status === g.kakao.maps.services.Status.OK) {
                            if (data.length > 0 ) {
                                setOptions(data);
                            } else {
                                setFieldHelpText('검색 결과 없음');
                            }                            
                        } else {
                            setFieldHelpText('검색 결과 없음');
                        }

                    }
                    /* const JUSO = {
                        url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
                        params: {
                            confmKey: 'U01TX0FVVEgyMDIxMDQzMDE2MjkxODExMTExNTU=',
                            resultType: 'json',
                            countPerPage: 100,
                            currentPage: 1,
                            keyword: '숲쟁이로'
                        }
                    }

                    JUSO.params.keyword = tValue;
                    const arr = Object.entries(JUSO.params);
                    JUSO.url = JUSO.url + arr.reduce((p: any, n, z) => {
                        return p = p + `${n[0]}=${n[1]}${arr.length - 1 !== z ? '&' : ''}`
                    }, '?')
                    setFieldHelpText('검색중');

                    const response = await fetch(JUSO.url);
                    const countries = await response.json();
                    const { common, juso } = countries.results;

                    if (common.errorCode !== '0') {
                        setFieldHelpText(common.errorMessage);
                    } else if (juso.length === 0) {
                        setFieldHelpText('검색 결과 없음');
                    } else {
                        const getAPT = juso.filter(v => v.bdNm.length > 0);
                        if (getAPT.length === 0) {
                            setFieldHelpText('검색 결과 없음');
                        }
                        setOptions(getAPT);
                    } */
                })();
            }, 300)
        } else {
            setOptions([]);
        }

    }, [tValue]);
    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (
        <Autocomplete
            id="asynchronous-demo"
            fullWidth
            open={open}
            blurOnSelect
            onOpen={() => {
                setOpen(true);
                setLoading(true);
                setTValue('')
            }}
            onClose={() => {
                setOpen(false);
                setLoading(false);
                setTValue('')
                //setSize(0);
            }}
            filterOptions={x => x}
            getOptionSelected={(option, value) => option.bdNm === value.bdNm}
            getOptionLabel={option => {
                return `${option.bdNm}`
            }}
            renderOption={(option) => {
                const { address_name, place_name, road_address_name, category_name } = option;
                return (
                    <div className="optionsLabel">
                        <strong className="bdNm">{place_name}<span>{category_name}</span></strong>
                        <div className="juso">
                            <em className="roadAddr">(도로명) {road_address_name}</em>
                            <em className="jibunAddr">(지번) {address_name}</em>
                        </div>
                    </div>
                )
            }}
            options={options}
            loading={loading}
            className="fire-Autocomplete"
            noOptionsText="검색중"
            loadingText={tValue.length < 3 ? '세글자 이상 입력 해주세요' : feieldHelpText}
            size={window.innerWidth <= 320 ? 'small' : 'medium'}
            onChange={(o, v) => {
                if (v) {
                    const { category_name, address_name } = v;
                    const btn = document.querySelector('.MuiAutocomplete-endAdornment button');
                    if (address_name.indexOf('경기') < 0) {
                        alert('경기지역 아님');
                        setOpen(false);
                        return
                    }
                    if (category_name.indexOf('아파트') < 0) {
                        alert('해당 건물은 아파트가 아닙니다.');
                        setOpen(false);
                        return;
                    }
                    if (!DATA[address_name]) {
                        alert('해당 건물은 데이터에서 찾을 수 없습니다.');
                        setTimeout(() => btn.click(), 300);
                        setMdFlag(true);
                        // load(address_name.split(' ')[1]).then(r => {
                        //     setData(r);
                            
                        // })
                        return;
                    }
                    
                    window.location.href = `#/detail:${address_name}`
                }
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label="주3소 또는 아파트 이름으로 검색"
                        variant="outlined"
                        //inputRef={textRef}
                        onInput={e => {
                            //setTValue(e.target.value);
                            callAPI(e.target.value)
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )
            }}
        />
    );
}
