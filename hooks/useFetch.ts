import { useReducer, useEffect } from 'react';
interface action {
    type: string;
    data?: any;
    error?: ErrorConstructor;
}

const reducer = (state, action: action) => {
    switch(action.type) {
        case 'LOADING' :
            return {
                loading: true,
                data: state.data,
                error: null
            }
        case 'SUCCESS' :
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR' :
            return {
                loading: false,
                data: [],
                error: action.error
            };
        default: throw new Error(`Unhandled action type: ${action.type}`);
    }
}
const useFetch = (url: string, deps = []) => {    
    const [ state, dispatch ] = useReducer(reducer, {
        loading: false,
        data: [],
        error: false
    });
    
    const fetchData = async () => {        
        dispatch({ type: 'LOADING'});
        try {
            const response = await fetch(url);
            const data = await response.json();            
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }

    useEffect(() => {
        fetchData();
    }, deps);

    return [ state, fetchData ]
}


export {
    useFetch    
}