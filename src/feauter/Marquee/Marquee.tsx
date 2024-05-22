import { ReactNode } from 'react';
import styles from './marquee.module.scss';

interface MarqueeProps {
    children: ReactNode;
}
function Marquee({ children }: MarqueeProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.marquee}>{children}</div>
        </div>
    );
}

export default Marquee;
