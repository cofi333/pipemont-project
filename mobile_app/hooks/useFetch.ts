import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { userAtom } from "@/utils/constants";

const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useRecoilState(userAtom);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            let response = await axios.get(`http://192.168.1.6:4000${url}`);
            setData(response.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, loading, refresh: fetchData };
};

export default useFetch;