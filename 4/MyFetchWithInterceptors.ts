import { IOptions, RequestInterceptor, ResponseInterceptor } from "./type/type"

class MyFetchWithInterceptors {
    // url : string
    // option? : IOptions
    requestInterceptors : RequestInterceptor[] = []
    responseInterceptors : ResponseInterceptor[] = []
    // constructor(url : string, option? : IOptions) {
    //     this.url = url
    //     this.option = option
    // }


    requestInterceptor(interceptor : RequestInterceptor) : void {
        this.requestInterceptors.push(interceptor)
    }

    responseInterceptor(interceptor : ResponseInterceptor) : void {
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

    async get(url : string, option ? : IOptions) : Promise<Response> {
        return this.myFetchWithInterceptors(url, { ...option, method: 'GET' })
    }

    async post(url : string, option ? : IOptions) : Promise<Response> {
        return this.myFetchWithInterceptors(url, { ...option, method: 'POST' })
    }

    async put(url : string, option ? : IOptions) : Promise<Response> {
        return this.myFetchWithInterceptors(url, { ...option, method: 'PUT' })
    }

    async delete(url : string, option ? : IOptions) : Promise<Response> {
        return this.myFetchWithInterceptors(url, { ...option, method: 'DELETE' })
    }
}
