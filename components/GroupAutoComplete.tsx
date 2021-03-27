/* eslint-disable no-use-before-define */
import React from 'react';
import { useHistory } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Grouped(props) {
    const { label, groupping, setState } = props;    
    const history = useHistory();
    
    const options: any = props.data.map((option) => {
        return {
            firstLetter: `${option[label]}-${option[groupping]}`,
            ...option,
        };
    });

    return (
        <Autocomplete
            id="grouped"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={option => option[groupping]}
            getOptionLabel={option => option[label]}
            getOptionSelected={(option, value) => option[label] === value[label]}
            renderInput={params => <TextField {...params} label={ `${label} 검색 하기`} variant="outlined" />}
            onChange={(event, newValue: any) => {                
                if (newValue) {
                    setState({ type: label, value: newValue[label] });
                    history.push(`/:${newValue[label] }`);
                }
            }}
        />
    );
}
