import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    padding: 10,
    margin: 10,
    textAlign: 'left',
    wordBreak: 'break-word'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function ItemCard(props) {
    const { data, refetch } = props;
    const classes = useStyles();
  
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
            {data.map(user => (
                <Card className={classes.root} key={user.id}>
                    <CardContent>
                        <Typography variant="body2" component="p" key={user.id}>
                            {JSON.stringify(user)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={refetch}>reload</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export { ItemCard };