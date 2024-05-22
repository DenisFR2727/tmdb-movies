import { useEffect, useState } from 'react';
const useScrollUp = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisability = (): void => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisability);

        return (): void =>
            window.removeEventListener('scroll', toggleVisability);
    }, []);
    const handleClick = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return { isVisible, handleClick };
};
export default useScrollUp;
