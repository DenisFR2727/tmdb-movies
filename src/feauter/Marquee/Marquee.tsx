import React, { ReactNode } from 'react';
import styles from './marquee.module.scss';

interface MarqueeProps {
    children: ReactNode;
}
function Marquee({ children }: MarqueeProps) {
    return <div className={styles.marquee}>{children}</div>;
}

export default Marquee;
