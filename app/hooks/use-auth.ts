import {useCallback} from "react";
import {metaMask} from "~/connectors/meta-mask";

const DISCONNECTED_LOCAL_STORAGE_KEY = 'tenderWalletDisconnected'

const useAuth = () => {
    const connect = useCallback(() => {
        metaMask.activate().then(() => {
            window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, '0')
        });
    }, []);

    const disconnect = useCallback(() => {
        metaMask.deactivate();
        window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, '1');
    }, []);

    const isDisconnected = useCallback(() => {
        return window.localStorage.getItem(DISCONNECTED_LOCAL_STORAGE_KEY) === '1';
    }, []);

    return {connect, disconnect, isDisconnected}
};

export default useAuth;
