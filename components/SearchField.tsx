// 검색폼
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const SearchField = () => {
    return (
        <>
            <InputLabel className="for" htmlFor="input-with-icon-adornment">조회 할 이름을 입력하세요</InputLabel>
            <Input
              id="input-with-icon-adornment"
                fullWidth={true}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              />
        </>      
    )
}

export { SearchField  }