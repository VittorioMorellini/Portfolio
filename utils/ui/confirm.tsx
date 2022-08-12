import * as React from 'react';
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type ConfirmDialogProps = {
    open: boolean;
    message?: string | JSX.Element;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function Confirm({
    open,
    message,
    onCancel,
    onConfirm
}: ConfirmDialogProps) {

    let msg = message ? message : 'Conferma Cancellazione';
    const messageElement = typeof msg === 'string' ? <Typography>{msg}</Typography> : msg;

    return (
        <Dialog
            //disableBackdropClick={true}
            disableEscapeKeyDown={true}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>ELIMINA</DialogTitle>
            <DialogContent>
                {messageElement}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Annulla
                </Button>
                <Button onClick={onConfirm} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}