import { useState, useEffect } from 'react';
import PrivateApi from '../api/private.api';

export function useTournament(id) {
    const [tournament, setTournament] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true)
        const result = await PrivateApi.GetTournament(id);
        if (result.success) {
            setTournament(result.response);
        }
        setLoading(false)
    }, [id])

    return [tournament, loading]
}