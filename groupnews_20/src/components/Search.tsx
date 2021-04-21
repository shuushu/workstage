// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useWindowSize from '../../../hooks/useWindowSize.ts';
import { DATA } from '../components/template'
interface CountryType {
    title: string;
    year: number;
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<CountryType[]>([]);
    const [size, setSize] = React.useState(0);
    const textRef = React.useRef();
    const loading = open && options.length === 0;
    const [width] = useWindowSize();

    React.useEffect(() => {
        if (size >= 2) {
            if (!loading) {
                return undefined;
            }
            setOptions(Object.entries(DATA).map(([v, k]: any) => k));
        }

    }, [size]);

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
            }}
            onClose={() => {
                setOpen(false);
                setSize(0);
            }}
            getOptionSelected={(option, value) => option['유도등 설치여부'] === value['유도등 설치여부']}
            getOptionLabel={(option) => option['유도등 설치여부']}
            options={options}
            loading={loading}
            className="fire-Autocomplete"
            noOptionsText="검색 결과 없음"
            size={width <= 320 ? 'small' : 'medium'}
            onChange={(o, v: any) => {
                if (v) {
                    // PK값 - object키 값이어야 함
                    window.location.href = `#/detail:키${v['순']}`
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
                            if (size < 2) {
                                setSize(e.target.value.length);
                            }
                            if (e.target.value.length < 2) {
                                setOptions([]);
                                // if (e.target.value.length === 0) {
                                // }
                                setSize(0);
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )
            }}
        />
    );
}
