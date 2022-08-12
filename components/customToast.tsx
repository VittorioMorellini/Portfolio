import { DefaultToast, TransitionState } from 'react-toast-notifications';

interface CustomToastProps {
    children: React.ReactNode;
    appearance: string;
    autoDismiss: boolean;
    autoDismissTimeout: number;
    transitionState: TransitionState;
    onDismiss: (Id: number | string) => void
}

export default function CustomToast({ children, appearance }: CustomToastProps) {
    <div style={{ background: appearance === 'error' ? 'red' : 'green' }}>
        {children}
    </div>
}
