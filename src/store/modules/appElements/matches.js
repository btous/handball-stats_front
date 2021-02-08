export default {
    state: {
        match: {},
        matches: {
            pending: [],
            "in-progress": [],
            ended: []
        }
    },
    getters: {
        match(state) {
            return state.match;
        },
        matches(state) {
            return state.matches;
        },
        matchesArray(state) {
            let matchesArray = [];
            for (let element in state.matches) {
                matchesArray = matchesArray.concat(state.matches[element])
            }
            return matchesArray;
        },
        pendingMatches(state) {
            return state.matches.pending;
        },
        inProgressMatches(state) {
            return state.matches["in-progress"];
        },
        endedMatches(state) {
            return state.matches.ended;
        },
        matchDate(state, getters) {
            return matchId => {
                if (matchId) {
                    return new Date(getters.matchesArray.find(item =>
                        item.id === matchId
                    ).date);
                } else {
                    return new Date(getters.match.date);
                }
            }
        },
        matchWeekDay(state, getters, rootState) {
            return matchId => rootState.weekDays[getters.matchDate(matchId).getDay()];
        },
        matchMonthDay(state, getters) {
            return matchId => getters.matchDate(matchId).getDate();
        },
        matchMonth(state, getters) {
            return matchId => getters.matchDate(matchId).getMonth() + 1;
        },
        matchYear(state, getters) {
            return matchId => getters.matchDate(matchId).getFullYear();
        },
        localTeam(state, getters) {
            return matchId => {
                if (matchId) {
                    let match = getters.matchesArray.find(item =>
                        item.id === matchId
                    )
                    return match.homeAway === 'home' ? getters.team.name : match.opponent;
                } else {
                    return getters.match.homeAway === 'home' ? getters.team.name : getters.match.opponent;
                }
            }
        },
        visitorTeam(state, getters) {
            return matchId => {
                if (matchId) {
                    let match = getters.matchesArray.find(item =>
                        item.id === matchId
                    )
                    return match.homeAway === 'home' ? match.opponent : getters.team.name;
                } else {
                    return getters.match.homeAway === 'home' ? getters.match.opponent : getters.team.name;
                }
            }
        },
        localScore(state, getters) {
            return matchId => {
                if (matchId) {
                    let match = getters.matchesArray.find(item =>
                        item.id === matchId
                    )
                    return match.homeAway === 'home' ? match.result.teamScore : match.result.opponentScore;
                } else {
                    return getters.match.homeAway === 'home' ? getters.match.result.teamScore : getters.match.result.opponentScore;
                }
            }
        },
        visitorScore(state, getters) {
            return matchId => {
                if (matchId) {
                    let match = getters.matchesArray.find(item =>
                        item.id === matchId
                    )
                    return match.homeAway === 'home' ? match.result.opponentScore : match.result.teamScore;
                } else {
                    return getters.match.homeAway === 'home' ? getters.match.result.opponentScore : getters.match.result.teamScore;
                }
            }
        },
    },
    mutations: {
        setMatch(state, match) {
            state.match = match;
        },
        setPendingMatches(state, matches) {
            let actualMatches = state.matches;
            state.matches = {};
            actualMatches.pending = matches;
            state.matches = actualMatches;
        },
        setInProgressMatches(state, matches) {
            let actualMatches = state.matches;
            state.matches = {};
            actualMatches["in-progress"] = matches;
            state.matches = actualMatches;
        },
        setEndedMatches(state, matches) {
            let actualMatches = state.matches;
            state.matches = {};
            actualMatches.ended = matches;
            state.matches = actualMatches;
        },
    },
    actions: {
        setMatch({ commit }, match) {
            commit('setMatch', match);
        },
        setPendingMatches({ commit }, matches) {
            commit('setPendingMatches', matches);
        },
        setInProgressMatches({ commit }, matches) {
            commit('setInProgressMatches', matches);
        },
        setEndedMatches({ commit }, matches) {
            commit('setEndedMatches', matches);
        },
        getMatch({ dispatch, getters }, dataMatch) {
            let data = {
              URL: "/matches/" + getters.match.id,
              method: "GET",
            };
            if(dataMatch) {
                data = dataMatch;
            }
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Partit carregat');
                    dispatch('setMatch', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getMatch(): ');
                    // console.log(error);
                    dispatch('setMatch', {});
                });
        },
        getPendingMatches({ dispatch, getters }, dataPending) {
            let data = {
                URL: "/teams/" + getters.team.id + "/pending_matches",
                method: "GET",
            };
            if(dataPending) {
                data = dataPending;
            }
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Partits pendents carregats');
                    dispatch('setPendingMatches', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getMatches(): ');
                    // console.log(error);
                    dispatch('setPendingMatches', null);
                });
        },
        getInProgressMatches({ dispatch, getters }, dataInProgress) {
            let data = {
                URL: "/teams/" + getters.team.id + "/in_progress_matches",
                method: "GET",
            };
            if(dataInProgress) {
                data = dataInProgress;
            }
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Partits en joc carregats');
                    dispatch('setInProgressMatches', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getMatches(): ');
                    // console.log(error);
                    dispatch('setInProgressMatches', null);
                });
        },
        getEndedMatches({ dispatch, getters }, dataEnded) {
            let data = {
                URL: "/teams/" + getters.team.id + "/ended_matches",
                method: "GET",
            };
            if(dataEnded) {
                data = dataEnded;
            }
            dispatch('callBackend', data)
                .then(data => {
                    // console.log('Partits finalitzats carregats');
                    dispatch('setEndedMatches', data);
                })
                .catch((/* error */) => {
                    // console.log('Error during getMatches(): ');
                    // console.log(error);
                    dispatch('setEndedMatches', null);
                });
        },
        updateMatch({ dispatch, getters }) {
            const data = {
                URL: "/matches/" + getters.match.id,
                method: "PUT",
                body: getters.match,
            };
            dispatch("callBackend", data)
                .then(() => {
                    // console.log('Partit actualitzat');
                    dispatch("getInProgressMatches");
                    dispatch("getEndedMatches");
                    dispatch("getMatch");
                })
                // .catch(error => {
                //     console.log('Error during updateMatch(): ');
                //     console.log(error);
                // });
        },
        deleteMatch({ dispatch }, id) {
            const data = {
                URL: "/matches/" + id,
                method: "DELETE",
            };
            dispatch("callBackend", data)
                // .then(() => {
                //     console.log("Partit eliminat");
                // })
                // .catch((error) => {
                //     console.log("Error during deleteMatch(): ");
                //     console.log(error);
                // });
        },
        deleteMatches({ dispatch }, elementsCheckedId) {
            const data = {
                URL: "/matches/",
                method: "DELETE",
                body: elementsCheckedId,
            };
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Partits eliminats");
                        dispatch('resetElementsChecked');
                        resolve();
                    })
                    .catch((/* error */) => {
                        // console.log("Error during deleteMatches(): ");
                        // console.log(error);
                        reject();
                    });
            });
        },
        setMatchPlayers({ dispatch, getters }) {
            const data = {
                URL: "/matches/" + getters.match.id + "/set_players",
                method: "PUT",
                body: getters.playersCheckedId,
            };
            return new Promise((resolve, reject) => {
                dispatch("callBackend", data)
                    .then(() => {
                        // console.log("Jugadors convocats actualitzats");
                        resolve();
                    })
                    .catch((/* error */) => {
                        // console.log("Error during setMatchPlayers(): ");
                        // console.log(error);
                        reject();
                    });
            });
        }
    }
}