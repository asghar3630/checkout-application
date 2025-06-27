// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@mui/material';
import { useState, forwardRef } from 'react';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - SLIDE ANIMATION ||=============================== //

export default function AlertDialogSlide() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                alert dialog
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-description1"
            >
                {open && (
                    <>
                        <DialogTitle id="alert-dialog-slide-title1">Confirmation</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description1">
                                <Typography variant="body2" component="span">
                                    confirmation
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button
                                sx={{ color: theme.palette.error.dark, borderColor: theme.palette.error.dark }}
                                onClick={handleClose}
                                color="secondary"
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" size="small" onClick={handleClose}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}
