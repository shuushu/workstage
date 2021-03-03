import { useState } from "react";
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
import { useForm } from "react-hook-form";

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
        button: {
            textTransform: 'initial'
        }
    }),
);

interface State {
    showPassword: boolean;
}


const Basic = () => {
    const classes = useStyles();
    const [values, setValues] = useState<State>({
        showPassword: false
    });
    const { register, handleSubmit, errors, reset } = useForm(); // initialise the hook
    const onSubmit = (data: { [key: string]: string }) => {
        console.log(data);
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

            <TextField className={clsx(classes.margin, classes.textField)}
                name="email"
                inputRef={register({
                    required: '필수 값입니다.',
                    pattern: {
                        value: /^\S+@\S+$/,
                        message: '잘못된 이메일 형식'
                    }
                })}
                label="이메일"
                error={errors.email && true}
                helperText={errors.email && errors.email.message}
            />

            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel error={errors.password && true} htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    name="password"
                    type={values.showPassword ? 'text' : 'password'}
                    inputRef={register({
                        required: '필수 값입니다.',
                        pattern: {
                            value: /[A-Za-z]/,
                            message: '비밀 번호 형식 다름'
                        }
                    })}
                    error={errors.password && true}
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
                {errors.password && <FormHelperText error={errors.password && true}>{errors.password.message}</FormHelperText>}
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
                inputRef={register}
            />
            <Button type="submit" variant="outlined">Default</Button>
            <Button variant="outlined" className={classes.button} onClick={() => reset()}>Reset</Button>
        </form>


    )
}

export {
    Basic
}