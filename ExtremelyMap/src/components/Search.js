import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

let timer;
const g = window;

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [feieldHelpText, setFieldHelpText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { setMdFlag, setData, setTitle } = props;
  const textRef = React.useRef();

  function resetInput() {
    clearTimeout(timer);
    if (textRef.current && textRef.current.value) {
      textRef.current.value = "";
    }
  }

  function callAPI(v) {
    clearTimeout(timer);

    if (v.length > 2) {
      timer = setTimeout(() => {
        (async () => {
          g.KAKAO.keywordSearch(v, placesSearchCB);
          setFieldHelpText("검색중");

          // 키워드 검색 완료 시 호출되는 콜백함수 입니다
          function placesSearchCB(data, status) {
            if (status === g.kakao.maps.services.Status.OK) {
              if (data.length > 0) {
                setOptions(data);
              } else {
                setFieldHelpText("검색 결과 없음");
              }
            } else {
              setFieldHelpText("검색 결과 없음");
            }
          }
        })();
      }, 300);
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
      filterOptions={(x) => x}
      getOptionSelected={(option, value) => option.bdNm === value.bdNm}
      getOptionLabel={(option) => {
        return `${option.bdNm}`;
      }}
      renderOption={(option) => {
        const {
          address_name,
          place_name,
          road_address_name,
          category_name,
        } = option;
        return (
          <div className="optionsLabel">
            <strong className="bdNm">
              {place_name}
              <span>{category_name}</span>
            </strong>
            <div className="juso">
              <em className="roadAddr">(도로명) {road_address_name}</em>
              <em className="jibunAddr">(지번) {address_name}</em>
            </div>
          </div>
        );
      }}
      options={options}
      loading={loading}
      className="fire-Autocomplete"
      noOptionsText="검색중"
      loadingText={
        textRef.current && textRef.current.value.length < 3
          ? "세글자 이상 입력 해주세요"
          : feieldHelpText
      }
      size={window.innerWidth <= 320 ? "small" : "medium"}
      onChange={(o, v) => {
        if (v) {
          window.location.href = `#/search:${v.road_address_name}`;
        }
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="주소 검색"
            variant="outlined"
            inputRef={textRef}
            onInput={(e) => {
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
        );
      }}
    />
  );
}
