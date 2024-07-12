export interface IOptions {
    body? : Blob | ArrayBuffer | DataView | FormData | URLSearchParams | string | String | ReadableStream,
    browsingTopics? : boolean,
    cache? : 'default' | 'no-cache' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached',
    credentials? : 'omit' | 'same-origin' | 'include'
    headers? : Headers | Record<string, string>,
    integrity? : any,
    keepAlive? : any,
    method? : string,
    mode? : string,
    priority? : 'high' | 'low' | 'auto',
    redirect? : 'follow' | 'error' | 'manual',
    referrerPolicy? : 'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url',
    referrer? : string,
    signal? : AbortSignal
}

export type RequestInterceptor = (option : IOptions) => IOptions | Promise<IOptions>
export type ResponseInterceptor = (response : Response) => Response | Promise<Response>

