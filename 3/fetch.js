"use strict";
async function fetchWrapper(url, config) {
    const method = config.method || 'GET';
    const options = {
        method,
        headers: {
            ...config.headers,
            'Content-Type': 'application/json',
        },
    };
    if (config.body) {
        options.body = JSON.stringify(config.body);
    }
    return fetch(url, options);
}
class MyFetch {
    constructor(url, config) {
        this.url = url;
        this.config = config;
    }
    async get() {
        return await fetchWrapper(this.url, {
            ...this.config
        });
    }
    async post() {
        return await fetchWrapper(this.url, {
            method: 'POST',
            ...this.config
        });
    }
    async put() {
        return await fetchWrapper(this.url, {
            method: 'PUT',
            ...this.config
        });
    }
    async delete() {
        return await fetchWrapper(this.url, {
            method: 'DELETE',
            ...this.config
        });
    }
}
