export default {
    state: {
        shot: {},
        save: {},
    },
    getters: {
        shot(state) {
            return state.shot;
        },
        save(state) {
            return state.save;
        },
    },
    mutations: {
        setShot(state, value) {
            state.shot = value;
        },
        setSave(state, value) {
            state.save = value;
        }
    },
    actions: {
        addAction({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Acció desada")
                        resolve()
                    })
                    .catch((/* error */) => {
                        // console.log("Error during addAction(): ");
                        // console.log(error);
                        reject();
                    });
            });
        },
        setShot({ commit }, value) {
            commit('setShot', value);
        },
        setSave({ commit }, value) {
            commit('setSave', value);
        },
    }
}