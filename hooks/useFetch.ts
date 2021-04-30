import { useReducer, useEffect } from 'react';
interface state {
    loading: boolean;
    data: any[];
    error: ErrorConstructor | null;
}
interface action {
    type: string;
    data?: any[];
    error?: ErrorConstructor;
}

const reducer = (state: state, action: action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: state.data,
                error: null
            }
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: [],
                error: action.error
            };
        default: throw new Error(`Unhandled action type: ${action.type}`);
    }
}
const useFetch = (props: any, deps = []) => {
    const { url, params } = props;
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: [],
        error: null
    });
    let PATH = url;

    const fetchData: any = async () => {
        dispatch({ type: 'LOADING' });
        try {
            if (params) {
                const arr = Object.entries(params);
                PATH = PATH + arr.reduce((p: any, n, z) => {
                    
                    return p = p + `${n[0]}=${n[1]}${arr.length-1 !== z ? '&' : ''}`
                }, '?')
            }
            const response = await fetch(PATH);
            const data = await response.json();
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }

    useEffect(() => {
        fetchData();
    }, deps);

    return [state, fetchData]
}


export {
    useFetch
}