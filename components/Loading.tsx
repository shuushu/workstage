import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: 100,
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

const Loading = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>
    );
}

export {
    Loading
}