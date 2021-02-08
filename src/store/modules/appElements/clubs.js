export default {
    state: {
        club: {},
        clubs: []
    },
    getters: {
        club(state) {
            return state.club;
        },
        clubName(state) {
            return state.club.name;
        },
        clubTeamsName(state) {
            return state.club.teamsName;
        },
        clubs(state) {
            return state.clubs;
        }
    },
    mutations: {
        setClub(state, club) {
            state.club = club;
        },
        setClubs(state, clubs) {
            state.clubs = clubs;
        },
    },
    actions: {
        setClub({ commit }, club) {
            commit('setClub', club);
        },
        setClubs({ commit }, clubs) {
            commit('setClubs', clubs);
        },
        getClubs({ dispatch, getters }) {
            const data = {
                URL: "/users/" + getters.user.id + "/clubs",
                method: "GET",
            };
            dispatch("callBackend", data)
                .then((data) => {
                    // console.log("Clubs carregats");
                    dispatch("setClubs", data);
                })
                .catch((/* error */) => {
                    // console.log("Error during getClubs(): ");
                    // console.log(error);
                    dispatch("setClubs", []);
                });
        },
        deleteClub({ dispatch }, id) {
            const data = {
                URL: "/clubs/" + id,
                method: "DELETE",
            };
            dispatch("callBackend", data)
                // .then(() => {
                //     console.log("Club eliminat");
                // })
                // .catch((error) => {
                //     console.log("Error during deleteClub(): ");
                //     console.log(error);
                // });
        },
        deleteClubs({ dispatch }, elementsCheckedId) {
            const data = {
                URL: "/clubs/",
                method: "DELETE",
                body: elementsCheckedId,
            };
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Clubs eliminats");
                        dispatch('resetElementsChecked');
                        resolve();
                    })
                    .catch((/* error */) => {
                        // console.log("Error during deleteClubs(): ");
                        // console.log(error);
                        reject();
                    });
            });
        },
    }
}