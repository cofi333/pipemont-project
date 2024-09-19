import { useEffect, useState } from "react";

const useAppHandlers = (
    navigation: any,
    setIsVisible: (state: boolean) => void
) => {
    const [isLogoutConfirmed, setIsLogoutConfirmed] = useState(false);

    useEffect(() => {
        const beforeRemoveListener = (e: any) => {
            if (!isLogoutConfirmed) {
                e.preventDefault();
                setIsVisible(true);
            }
        };

        const unsubscribe = navigation.addListener(
            "beforeRemove",
            beforeRemoveListener
        );

        return () => {
            unsubscribe();
        };
    }, [navigation, isLogoutConfirmed]);

    return { setIsLogoutConfirmed };
};

export default useAppHandlers;
