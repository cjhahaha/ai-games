import { useEffect, useState } from 'react';

export function useWasm(props) {
    const { url, config = {} } = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        (async () => {
            try {
                const fetchPromise = fetch(url);
                const _data = await window.WebAssembly.instantiateStreaming(fetchPromise, config);
                setData(_data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        })();
    }, [url, JSON.stringify(config)]);

    return { loading, data, error };
}
