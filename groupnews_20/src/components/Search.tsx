import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

let timer;
const g: any = window;

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [feieldHelpText, setFieldHelpText] = React.useState('');
    const textRef = React.useRef();
    const [loading, setLoading] = React.useState(false);
    const [tValue, setTValue] = React.useState('')

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
            //getOptionSelected={(option, value) => option.bdNm === value.bdNm}
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
            onChange={(o, v: any) => {
                if (v) {
                    
                    
                    window.location.href = `#/detail:${v.address_name}`
                }
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label="주소 또는 아파트 이름으로 검색"
                        variant="outlined"
                        inputRef={textRef}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTValue(e.target.value);
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
