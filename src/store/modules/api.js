export default {
    state: {
        // backendURL: "http://localhost:8080"
        backendURL: "https://handballstatsapi.herokuapp.com"
    },
    getters: {
        backendURL(state) {
            return state.backendURL;
        }
    },
    mutations: {
        setBackendURL(state, url) {
            state.backendURL = url;
        }
    },
    actions: {
        setBackendURL({ commit }, url) {
            commit("setBackendURL", url);
        },
        callBackend({ getters }, payload) {
            return new Promise((resolve, reject) => {
                fetch(getters.backendURL + payload.URL, {
                    method: payload.method,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(payload.body)
                })
                    .then(
                        result => {
                            if (result.ok) {
                                result.json()
                                    .then(result => {
                                        resolve(result)
                                    });
                            } else {
                                result.json()
                                    .then(error => {
                                        reject(error)
                                    });
                            }
                        }
                    )
                    .catch(error => {
                        reject(error);
                    })
            })
        },
    }
}