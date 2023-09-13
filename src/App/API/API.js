// Import Axios if you're using this in Node.js
import axios from "axios"

class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL
        this.defaultHeaders = {
        'Content-Type': 'application/json',
        // Add any other default headers here
        }
    }

    setHeader(key, value) {
        this.defaultHeaders[key] = value
    }

    async request(method, url, data = null, customHeaders = {}) {
        try {
            const fullURL = this.baseURL + url
            const headers = { ...this.defaultHeaders, ...customHeaders }
            const config = { method, url: fullURL, headers }

            if (data) {
                config.data = data
            }

            const response = await axios(config)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async get(url, customHeaders = {}) {
        return this.request('get', url, null, customHeaders)
    }

    async post(url, data, customHeaders = {}) {
        return this.request('post', url, data, customHeaders)
    }

    async put(url, data, customHeaders = {}) {
        return this.request('put', url, data, customHeaders)
    }

    async patch(url, data, customHeaders = {}) {
        return this.request('patch', url, data, customHeaders)
    }

    async delete(url, customHeaders = {}) {
        return this.request('delete', url, null, customHeaders)
    }
}

export default APIClient

// // Example usage:
// const apiBaseURL = 'https://api.example.com/'
// const api = new APIClient(apiBaseURL)

// // Set Authorization header (if required) - example with a token
// api.setHeader('Authorization', 'Bearer your_access_token_here')

// // GET request example with custom headers
// api.get('users', { 'X-Custom-Header': 'Custom Value' }).then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error.message)
// })

// // POST request example with custom headers
// const newUser = {
//   name: 'John Doe',
//   email: 'john.doe@example.com',
// }
// api.post('users', newUser, { 'X-Custom-Header': 'Custom Value' }).then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error.message)
// })

// // PUT request example with custom headers
// const updatedUser = {
//   name: 'John Updated',
// }
// api.put('users/1', updatedUser, { 'X-Custom-Header': 'Custom Value' }).then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error.message)
// })

// // PATCH request example with custom headers
// const updatedInfo = {
//   bio: 'I love coding!',
// }
// api.patch('users/1', updatedInfo, { 'X-Custom-Header': 'Custom Value' }).then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error.message)
// })

// // DELETE request example with custom headers
// api.delete('users/1', { 'X-Custom-Header': 'Custom Value' }).then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error.message)
// })
