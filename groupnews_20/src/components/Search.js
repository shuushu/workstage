import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import DATA from "./data";
import { 중복체크, 주소없음 } from './예외데이터'
// import { GoogleSpreadsheet } from 'google-spreadsheet';

let timer;
const g = window;

function delay() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

// async function load(si) {
//     const doc = new GoogleSpreadsheet('1vh7OnmmDaY2mOXSMTaNuF6vcMVu2GYuno_GepuusRME');
//     // await doc.useServiceAccountAuth({
//     //     client_email,
//     //     private_key
//     // });
//     await doc.useApiKey('AIzaSyBudarQhMv3AL0900S8zFiM2HN7UaEu5_A');    
//     await doc.loadInfo(); // loads document properties and worksheets

//     const sheet = doc.sheetsByTitle[si]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
//     // read rows
//     const rows = await sheet.getRows(); // can pass in { limit, offset }
//     return rows
// }



export default function Asynchronous(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [feieldHelpText, setFieldHelpText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { setMdFlag, setData } = props;
    const textRef = React.useRef();
    
    function resetInput() {
        clearTimeout(timer);
        if (textRef.current && textRef.current.value) {            
            textRef.current.value = ''
        }
    }

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
        if (!open) {
            setOptions([]);            
        }
        timer = setTimeout(resetInput, 100);
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
            }}
            onClose={() => {
                setOpen(false);
                setLoading(false);
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
            loadingText={textRef.current && textRef.current.value.length < 3 ? '세글자 이상 입력 해주세요' : feieldHelpText}
            size={window.innerWidth <= 320 ? 'small' : 'medium'}
            onChange={(o, v) => {
                if (v) {
                    const { category_name, address_name } = v;
                    const btn = document.querySelector('.MuiAutocomplete-endAdornment button');
                    if (address_name.indexOf('경기') < 0) {
                        alert('경기지역 아님');
                        setOpen(false);
                        timer = setTimeout(resetInput, 100);
                        return;
                    }
                    if (category_name.indexOf('아파트') < 0) {
                        alert('해당 건물은 아파트가 아닙니다.');
                        setOpen(false);
                        timer = setTimeout(resetInput, 100);
                        return;
                    }
                    if (address_name in 중복체크) {
                        setMdFlag(true);
                        setData(Object.entries(중복체크[address_name]));
                        return;
                    }
                    //console.log('경기 고양시 일산동구 마두동 789', address_name)
                    if (!DATA[address_name]) {
                        alert('해당 건물은 데이터에서 찾을 수 없습니다.');
                        timer = setTimeout(resetInput, 100);
                        // setMdFlag(true);
                        // load(address_name.split(' ')[1]).then(r => {
                        //     setData(r);
                        // })
                        return;
                    }
                    
                    clearTimeout(timer);
                    window.location.href = `#/detail:${address_name}`
                }
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label="주소 또는 아파트 이름으로 검색"
                        variant="outlined"
                        inputRef={textRef}
                        onInput={e => {                            
                            callAPI(e.target.value);                            
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
