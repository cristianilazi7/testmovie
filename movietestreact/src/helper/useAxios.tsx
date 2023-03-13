import { useState, useEffect } from "react";
import axios from './my-module.mjs';

const useAxios = (url: string, params:any, method: 'get' | 'post' = 'get', config: any ) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const Params = new URLSearchParams();
    
    Params.append('email', params?.email);
    Params.append('password', params?.password);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: any;
                if (method === 'get') {
                     response = await axios.post(url,Params,config);
                } else if (method === 'post') {
                    response = await axios.post(url,Params,config);
                }
                
                setData(response.data);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[url, params, method, config]);

    return { data, error, loading };
}

export default useAxios;