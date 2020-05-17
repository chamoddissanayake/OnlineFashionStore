import axios from 'axios';






export function getProducts() {

        return axios.get(`/api/products`)

                .then(response => response.data);

}

export function postFetchComments(productId) {

        console.log("Product Id_ >" + productId);

        return axios.post(`/api/comments`, { id: productId })
                .then(response => response.data);

}

export function postSelectedProduct(currentID) {
        console.log(currentID);
        return axios.post(`/api/selectitem`, { id: currentID })
                .then(response => response.data);

}

export function getCartProducts(cart) {

        return axios.post(`/api/products`, { cart })

                .then(response => {
                        console.log(response.data);
                })
                .catch(err => Promise.reject('Something Went Wrong!'));

}

export function login(data) {

        return axios.post(`/api/auth`,

                { name: data.name, password: data.password })

                .then(response => {

                        localStorage.setItem('x-access-token', response.data.token);

                        localStorage.setItem('x-access-token-expiration',

                                Date.now() + 2 * 60 * 60 * 1000);

                        return response.data
                })

                .catch(err => Promise.reject('Authentication Failed!'));

}

export function pay(data) {

        return axios.get(`/api/pay`,

                { params: { 'x-access-token': localStorage.getItem('x-access-token') } })

                .then(response => response.data)

                .catch(err => Promise.reject(err));

}

export function isAuthenticated() {

        return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()

}
