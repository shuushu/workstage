import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }),
);

export default function TransitionsModal(props) {
    const classes = useStyles();
    const { mdFlag, setMdFlag, children } = props;

    const handleClose = () => {
        setMdFlag(false);
    };

    return (
        <div id="modal">
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                className={classes.modal}
                open={mdFlag}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={mdFlag}>

                    {children ? <div className="nodata">{children}</div> : (
                        <div className="md-wrap">
                            <div id="chart"></div>
                            <div id="md-contents"></div>
                        </div>
                    )}


                </Fade>
            </Modal>
        </div>
    );
}
