import { IOptions, RequestInterceptor, ResponseInterceptor } from "./type/type"

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