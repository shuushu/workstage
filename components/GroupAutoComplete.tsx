/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { selectOptionList } from '.,/../../groupnews_19/src/asset/data/DataDetail'

const g: any = global;
export default function Grouped(props) {
    const { label, groupping, setState, selectedName, setSort } = props;
    const selectValue = selectedName && g.location.type === 'name' ? selectedName.substr(1) : {
        [label]: ''
    };
    const history = useHistory();

    const optionItems = props.data.sort((a, b) => {
        return b[groupping].localeCompare(a[groupping]);
    })

    let getIdx = -1;
    optionItems.forEach((d, i) => {
        if (d[label] === selectValue) {
            getIdx = i
        }
    });




    return (
        <Autocomplete
            size="small"
            id="grouped"
            blurOnSelect
            value={selectOptionList[getIdx] || selectValue}
            options={selectOptionList}
            groupBy={option => option[groupping]}
            getOptionLabel={option => option[label]}
            getOptionSelected={(option, value) => {
                if (selectValue) {
                    return option[label] === selectValue
                } else {
                    return option[label] === value[label];
                }
            }}

            renderInput={(params: any) => {
                return <TextField  {...params} label={`${label} 검색 하기`} variant="outlined" />
            }}
            onChange={(event, newValue: any) => {
                if (newValue) {
                    setSort('all');
                    setState({ type: label, value: newValue[label] });
                    history.push({
                        pathname: `/:${newValue[label]}`,
                        state: { type: 'name' }
                    });
                }
            }}
        />
    );
}
