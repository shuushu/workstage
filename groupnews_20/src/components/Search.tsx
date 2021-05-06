// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import DATA from "../components/data";
import {
    AsyncArray
} from '../../../components/Util'

let timer;

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [feieldHelpText, setFieldHelpText] = React.useState('');
    const textRef = React.useRef();
    const loading = open && options.length === 0;
    const [tValue, setTValue] = React.useState('')

    React.useEffect(() => {
        clearTimeout(timer);
        if (tValue.length > 2) {
            timer = setTimeout(() => {
                (async () => {
                    const JUSO = {
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

                    if (common.errorCode !== '0' || juso.length === 0) {
                        setFieldHelpText('네트워크 에러');
                    } else {
                        const getAPT = juso.filter(v => v.bdNm.length > 0);
                        if (getAPT.length === 0) {
                            setFieldHelpText('검색 결과 없음');
                        }
                        setOptions(getAPT);
                    }
                })();
            }, 1000)
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
                setTValue('')
            }}
            onClose={() => {
                setOpen(false);
                setTValue('')
                //setSize(0);
            }}
            //getOptionSelected={(option, value) => option.bdNm === value.bdNm}
            getOptionLabel={option => {
                return `${option.bdNm} - ${option.roadAddr}`
            }}
            renderOption={(option) => {
                const { bdNm, roadAddr, jibunAddr } = option;
                return (
                    <div className="optionsLabel">
                        <strong className="bdNm">{bdNm}</strong>
                        <div className="juso">
                            <em className="roadAddr">{roadAddr}</em>
                            <em className="jibunAddr">{jibunAddr}</em>
                        </div>
                    </div>
                )
            }}

            options={options}
            loading={loading}
            className="fire-Autocomplete"
            noOptionsText="검색중"
            loadingText={tValue.length < 3 ? '두글자 이상 입력 해주세요' : feieldHelpText}
            size={window.innerWidth <= 320 ? 'small' : 'medium'}
            onChange={(o, v: any) => {
                if (v) {
                    console.log(v);
                    // PK값 - object키 값이어야 함
                    //window.location.href = `#/detail:키${v['순']}`
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
