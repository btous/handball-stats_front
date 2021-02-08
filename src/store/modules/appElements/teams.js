export default {
    state: {
        team: {},
        teams: []
    },
    getters: {
        team(state) {
            return state.team;
        },
        teams(state) {
            return state.teams;
        }
    },
    mutations: {
        setTeam(state, team) {
            state.team = team;
        },
        setTeams(state, teams) {
            state.teams = teams;
        }
    },
    actions: {
        setTeam({ commit }, team) {
            commit('setTeam', team);
        },
        setTeams({ commit }, teams) {
            commit('setTeams', teams);
        },
        getTeams({ dispatch }, data) {
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Equips carregats');
                    dispatch('setTeams', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getTeams(): ');
                    // console.log(error);
                    dispatch('setTeams', []);
                });
        },
        deleteTeam({ dispatch }, id) {
            const data = {
                URL: "/teams/" + id,
                method: "DELETE",
            };
            dispatch("callBackend", data)
                .then(() => {
                    // console.log("Equip eliminat");
                })
                // .catch((error) => {
                //     console.log("Error during deleteTeam(): ");
                //     console.log(error);
                // });
        },
        deleteTeams({ dispatch }, elementsCheckedId) {
            const data = {
                URL: "/teams/",
                method: "DELETE",
                body: elementsCheckedId,
            };
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Equips eliminats");
                        dispatch('resetElementsChecked');
                        resolve();
                    })
                    .catch((/* error */) => {
                        // console.log("Error during deleteTeams(): ");
                        // console.log(error);
                        reject();
                    });
            });
        },
    }
}