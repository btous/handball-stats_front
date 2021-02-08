export default {
    state: {
        player: {},
        players: [],
        playerTeams: []
    },
    getters: {
        player(state) {
            return state.player;
        },
        players(state) {
            return state.players;
        },
        playerTeams(state) {
            return state.playerTeams;
        },
        playerBirthday(state, getters) {
            if (getters.player.birthday) {
                return new Date(getters.player.birthday);
            } else {
                return null;
            }
        },
        playerDayBirthday(state, getters) {
            if (getters.playerBirthday) {
                return getters.playerBirthday.getDate();
            } else {
                return '--';
            }
        },
        playerMonthBirthday(state, getters) {
            if (getters.playerBirthday) {
                return getters.playerBirthday.getMonth() + 1;
            } else {
                return '--';
            }
        },
        playerYearBirthday(state, getters) {
            if (getters.playerBirthday) {
                return getters.playerBirthday.getFullYear();
            } else {
                return '--';
            }
        },
        playerAge(state, getters) {
            if (getters.playerBirthday) {
                let ageDif = Date.now() - getters.playerBirthday;
                let ageDate = new Date(ageDif);
                return ageDate.getFullYear() - 1970;
            } else {
                return '--';
            }
        }
    },
    mutations: {
        setPlayer(state, player) {
            state.player = player;
        },
        setPlayers(state, players) {
            state.players = players;
        },
        setPlayerTeams(state, teams) {
            state.playerTeams = teams;
        }
    },
    actions: {
        setPlayer({ commit }, player) {
            commit('setPlayer', player);
        },
        setPlayers({ commit }, players) {
            commit('setPlayers', players);
        },
        setPlayerTeams({ commit }, teams) {
            commit('setPlayerTeams', teams);
        },
        getPlayers({ dispatch }, data) {
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Jugadors carregats');
                    dispatch('setPlayers', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getPlayers(): ');
                    // console.log(error);
                    dispatch('setPlayers', []);
                });
        },
        deletePlayer({ dispatch }, id) {
            const data = {
                URL: "/players/" + id,
                method: "DELETE",
            };
            dispatch("callBackend", data)
                .then(() => {
                    // console.log("Jugador eliminat");
                })
                // .catch((error) => {
                //     console.log("Error during deletePlayer(): ");
                //     console.log(error);
                // });
        },
        deletePlayers({ dispatch }, elementsCheckedId) {
            const data = {
                URL: "/players/",
                method: "DELETE",
                body: elementsCheckedId,
            };
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Jugadors eliminats");
                        dispatch('resetElementsChecked');
                        resolve();
                    })
                    .catch((/* error */) => {
                        // console.log("Error during deletePlayers(): ");
                        // console.log(error);
                        reject();
                    });
            });
        },
    }
}