import React, { useRef, useState } from 'react';
import Confirm from './ui/confirm';

function useConfirm() {
    const [open, setOpen] = useState(false);
    const onCancel = () => { setOpen(false) };
    const onConfirm = useRef<() => void>();
    const message = useRef<string | JSX.Element | undefined>();

    return {
        Confirm:
            <Confirm
                open={open}
                onCancel={onCancel}
                onConfirm={onConfirm.current!}
                message={message.current}
            />,
        requestConfirm: (action: () => void, confirmMessage?: string | JSX.Element) => {
            setOpen(true);
            message.current = confirmMessage;
            onConfirm.current = () => {
                action();
                setOpen(false);
            }
        }
    }
}

export default useConfirm;