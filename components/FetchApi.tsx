import { Loading } from "./Loading";
const FetchApi = (props) => {
    let { loading, error, data, children } = props;

    if (loading) {
        return <Loading />
    }

    if (error) return <div>네트워크 에러가 발생했습니다</div>;

    if (data && Array.isArray(data) && data.length > 0) {
        return (
            <>
                { children}
            </>
        )

    } else {
        return <div>데이터가 없거나, 배열 타입이 아닙니다.</div>
    }
}

FetchApi.defaultProps = {
    loading: true,
    error: false,
    data: [],
    url: '',
    children: 'undefined modules'
}

export {
    FetchApi
}