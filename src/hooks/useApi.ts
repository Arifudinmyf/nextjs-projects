"use client";

import { api } from "@/libs/api";
import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchOptions<TRequest, TData> {
    method?: HttpMethod;
    params?: Record<string, string | number | boolean | undefined>;
    req?: TData;
    onSuccess?: (data: TData) => void;
    onError?: (error: unknown) => void;
}

export function useFetch<TRequest = unknown, TData = unknown>(
    url: string,
    options?: UseFetchOptions<TRequest, TData>
) {
    const {
        method = "",
        params,
        req,
        onSuccess,
        onError,
    } = options || {};

    const [data, setData] = useState<TData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    const fetchData = useCallback(
        async (
            override?: Partial<{
                url: string;
                method: HttpMethod;
                params: Record<string, string | number | boolean | undefined>;
                req: TRequest;
            }>
        ) => {
            setLoading(true);
            setError(null);
            try {
                const finalUrl = override?.url || url;
                const finalMethod = override?.method || method;
                const res = await api.request<TData>({
                    url: finalUrl,
                    method: override?.method || method,
                    params: override?.params || params,
                    ...(finalMethod !== "GET" ? { data: override?.req as TData | undefined } : {})
                });

                setData(res.data);
                onSuccess?.(res.data);
            } catch (err) {
                setError(err);
                onError?.(err);
            } finally {
                setLoading(false);
            }
        },
        [url, method, params, req, onSuccess, onError]
    );

    return { data, loading, error, refetch: fetchData };
}
