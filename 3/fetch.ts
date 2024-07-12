interface IOptions {
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

interface Interceptor {
    requestInterceptor? : (option : IOptions) => IOptions | Promise<IOptions>
    responseInterceptor? : (response : Response) => Response | Promise<Response>
}

type RequestInterceptor = (option : IOptions) => IOptions | Promise<IOptions>
type ResponseInterceptor = (response : Response) => Response | Promise<Response>


class MyFetchWithInterceptors {
    url : string
    option ?: IOptions
    requestInterceptors : RequestInterceptor[] = []
    responseInterceptors : ResponseInterceptor[] = []

    constructor(url : string, option? : IOptions) {
        this.url = url
        this.option = option
    }

    requestInterceptor(interceptor : RequestInterceptor) {
        this.requestInterceptors.push(interceptor)
    }

    responseInterceptor(interceptor : ResponseInterceptor) {
        this.responseInterceptors.push(interceptor)
    }

    async myFetch(url : string, option : IOptions) : Promise<Response> {
        const method : string = option.method || 'GET'
        const options : RequestInit = {
            method,
            headers: {
                ...option.headers,
                'Content-Type': 'application/json',
            },
        }

        if (option.body) {
            options.body = JSON.stringify(option.body)
        }

        return fetch(url, options)
    }

    async myFetchWithInterceptors(url : string, option : IOptions) : Promise<Response> {
        for (const requestInterceptor of this.requestInterceptors) {
            option = await requestInterceptor(option)
        }

        let response : Response = await this.myFetch(url, option)

        for (const responseInterceptor of this.responseInterceptors) {
            response = await responseInterceptor(response)
        }

        return response
    }

    // override
    async get() : Promise<Response> {
        return this.myFetchWithInterceptors(this.url, { ...this.option, method: 'GET' })
    }

    async post() : Promise<Response> {
        return this.myFetchWithInterceptors(this.url, { ...this.option, method: 'POST' })
    }

    async put() : Promise<Response> {
        return this.myFetchWithInterceptors(this.url, { ...this.option, method: 'PUT' })
    }

    async delete() : Promise<Response> {
        return this.myFetchWithInterceptors(this.url, { ...this.option, method: 'DELETE' })
    }
}

let fetches: MyFetchWithInterceptors = new MyFetchWithInterceptors('xxx.com')
fetches.put().then()