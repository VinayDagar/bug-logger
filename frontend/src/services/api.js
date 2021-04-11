import Axios from "axios";
import { stringify } from "qs";
import { showLoader, hideLoader } from "./loader";
import { store } from "store";
import { logout } from "store/auth/action";

function createAxios() {
    const axios = Axios.create();

    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/v1`;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.timeout = 120000; // 120 seconds before time out

    axios.interceptors.request.use(
        (conf) => {
            showLoader();
            return conf;
        },
        (error) => {
            hideLoader();
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            hideLoader();
            return response;
        },
        (error) => {
            hideLoader();
            console.log("error in interceptor", error);
            if (error && error.response) {
                if (error.response.status === 401) {
                    window.location.href = "/login";
                    store.dispatch(logout());
                }
                if (error.response.data) {
                    return Promise.reject(error.response.data);
                }
            }
            return Promise.reject(error);
        }
    );
    return axios;
}

// Initialise Axios
const api = createAxios();

const service = {
    getHeaders() {
        return {
            "Content-Type": "application/json",
            "x-access-token": `Breare ${localStorage.getItem("x-access-token")}`,
        };
    },
    // POST services
    async postWithoutHeaders(route, body) {
        const { data } = await api.post(route, body);
        return data.object;
    },

    async rawPost(path, payload) {
        const headers = this.getHeaders();

        const { data } = await api.post(path, payload, {
            headers,
        });

        return data.object;
    },

    // GET services
    async getById(route, id) {
        const headers = this.getHeaders();
        const { data } = await api.get(`${route}/${id}`, {
            headers,
        });
        return data.object;
    },

    async get(route, query = {}, shouldAppendV2 = false) {
        if (shouldAppendV2) {
            Object.assign(query, {
                apiVersion: "v2",
            });
        }
        let headers = this.getHeaders();
        const { data } = await api.get(`${route}?${stringify(query)}`, {
            headers,
        });
        return data.object;
    },

    async getWithoutHeaders(route) {
        const { data } = await api.get(route);
        return data.object;
    },

    // PUT services
    async update(route, query = {}, body, shouldAppendV2 = false) {
        if (shouldAppendV2) {
            Object.assign(query, {
                apiVersion: "v2",
            });
        }
        const headers = this.getHeaders();
        const { data } = await api.put(`${route}?${stringify(query)}`, body, {
            headers,
        });
        return data.object;
    },

    async rawPut(path, payload) {
        const { data } = await api.put(path, payload);
        return data.object;
    },

    async put(path, payload) {
        const headers = this.getHeaders();
        const { data } = await api.put(path, payload, {
            headers
        });
        return data.object;
    },

    async updateById(route, id, body) {
        const headers = this.getHeaders();
        const { data } = await api.put(`${route}/${id}`, body, {
            headers,
        });
        return data.object;
    },

    async updateOrCreate(route, body) {
        const headers = this.getHeaders();

        let response;

        if (body.id) {
            response = await this.updateById(route, body.id, body, {
                headers,
            });
        } else {
            response = await this.rawPost(route, body, {
                headers,
            });
        }
        return response;
    },

    // PATCH services
    async patch(route, body) {
        const headers = this.getHeaders();
        const { data } = await api.patch(`${route}`, body, {
            headers,
        });
        return data.object;
    },

    // DELETE services
    async delete(route, id) {
        const headers = this.getHeaders();
        return api.delete(`${route}/${id}`, {
            headers,
        });
    },

    test() {
        console.log("http service is working fine.");
    },
};

window.$http = service;

export default service;
