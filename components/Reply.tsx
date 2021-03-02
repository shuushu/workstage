import { useState, ChangeEvent } from "react";
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }),
);

interface State {
    password: string;
    nickname: string;
    showPassword: boolean;
    context: string;
}


const Basic = () => {
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        password: '',
        nickname: '',
        context: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleClick = () => {
        console.log(values)
    }


    return (
        <form noValidate autoComplete="off">
            <TextField className={clsx(classes.margin, classes.textField)}
                required
                id="outlined-required"
                label="닉네임"
                onChange={handleChange('nickname')}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <TextField
                id="outlined-full-width"
                label="내용을 입력하세요"
                placeholder="로그인 후 이용 가능"
                name="context"
                fullWidth
                multiline
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                // rows={4}
                variant="outlined"
                onChange={handleChange('context')}
            />
            <Button onClick={handleClick} variant="outlined">Default</Button>
        </form>


    )
}

export {
    Basic
}