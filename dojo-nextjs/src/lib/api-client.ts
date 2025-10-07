import { ApiError, FetchOptions } from "@/types/interfaces";


const API_CONFIG = {

    baseURL: "https://fakestoreapi.com",

    timeout: 10000,

    retries: 3,

    retryDelay: 1000,
} as const;


const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json",
} as const;


function createApiError(message: string, status: number, details?: unknown): ApiError {
    return {
        message,
        status,
        details,
    };
}


function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const {
        timeout = API_CONFIG.timeout,
        retries = API_CONFIG.retries,
        ...fetchOptions
    } = options;

    const url = `${API_CONFIG.baseURL}${endpoint}`;
    let lastError: Error | null = null;


    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                ...fetchOptions,
                headers: {
                    ...DEFAULT_HEADERS,
                    ...fetchOptions.headers,
                },
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw createApiError(
                    `Erro HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    errorText
                );
            }

            const data = await response.json();

            if (process.env.NODE_ENV === "development") {
                console.log(`✅ API Success: ${endpoint}`, {
                    attempt: attempt + 1,
                    status: response.status,
                });
            }

            return data as T;

        } catch (error) {
            lastError = error as Error;

            if (process.env.NODE_ENV === "development") {
                console.warn(`⚠️ API Error (attempt ${attempt + 1}/${retries + 1}): ${endpoint}`, error);
            }

            if (attempt < retries) {
                await delay(API_CONFIG.retryDelay * (attempt + 1));
            }
        }
    }

    throw createApiError(
        `Falha após ${retries + 1} tentativas: ${lastError?.message}`,
        500,
        lastError
    );
}

export const apiClient = {

    get: <T>(endpoint: string, options?: FetchOptions) =>
        fetchWithRetry<T>(endpoint, { ...options, method: "GET" }),

    post: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        fetchWithRetry<T>(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
        }),

    put: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        fetchWithRetry<T>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
        }),

    delete: <T>(endpoint: string, options?: FetchOptions) =>
        fetchWithRetry<T>(endpoint, { ...options, method: "DELETE" }),
};

export const API_BASE_URL = API_CONFIG.baseURL;
