import router from '@/router/index'
export default {
    actions: {
        createElement({ dispatch }, elementType) {
            if (elementType) {
                dispatch('goToCreatePage', elementType);
            }
        },
        goToCreatePage({ getters, dispatch }, elementType) {
            dispatch("setCreating", true);
            switch (elementType) {
                case "club":
                case "team":
                case "player":
                case "match":
                    router.push("/create-" + elementType);
                    break;
                case "team-player":
                    router.push("/create-player/" + getters.team.category + getters.team.gender + getters.team.categoryLabel);
                    break;
                case "match-player":
                    router.push("/create-player/" + getters.team.category + getters.team.gender + getters.team.categoryLabel);
                    break;
            }
        },
        editElement({ dispatch, getters }, elementType) {
            switch (elementType) {
                case "club":
                    dispatch('setElementsCheckedId', [getters.clubs[0].id]);
                    break;
                case "team":
                    dispatch('setElementsCheckedId', getters.teamsCheckedId);
                    break;
                case "player":
                case "team-player":
                    dispatch('setElementsCheckedId', getters.playersCheckedId);
                    break;
                case "match":
                    dispatch('setElementsCheckedId', getters.matchesCheckedId);
                    break;
                default:
                    dispatch('setElementsCheckedId', []);
            }
            if (getters.elementsCheckedId.length === 1) {
                dispatch('goToEditPage', elementType);
            } else if (getters.elementsCheckedId.length === 0) {
                alert("Selecciona l'element que vols editar");
            } else {
                alert(
                    "No pots editar més d'un element a la vegada. Selecciona un sol element."
                );
            }
        },
        goToEditPage({ dispatch }, elementType) {
            dispatch("setEditing", true);
            switch (elementType) {
                case "team-player":
                    router.push("/edit-player");
                    break;
                default:
                    router.push("/edit-" + elementType);
            }
        },
        deleteElements({ dispatch, getters }, elementType) {
            switch (elementType) {
                case "club":
                    dispatch('setElementsCheckedId', [getters.clubs[0].id]);
                    break;
                case "team":
                    dispatch('setElementsCheckedId', getters.teamsCheckedId);
                    break;
                case "player":
                case "team-player":
                    dispatch('setElementsCheckedId', getters.playersCheckedId);
                    break;
                case "match":
                    dispatch('setElementsCheckedId', getters.matchesCheckedId);
                    break;
                default:
                    dispatch('setElementsCheckedId', []);
            }
            if (getters.elementsCheckedId.length === 0) {
                alert("Selecciona els elements que vols eliminar");
            } else {
                return new Promise((resolve, reject) => {
                    dispatch('executeDelete', elementType)
                        .then(() => resolve())
                        .catch(() => reject());
                });
            }
        },
        executeDelete({ dispatch, getters }, elementType) {
            return new Promise((resolve, /* reject */) => {
                switch (elementType) {
                    case "club":
                        dispatch('deleteClubs', getters.elementsCheckedId).then(() => resolve());
                        break;
                    case "team":
                        dispatch('deleteTeams', getters.elementsCheckedId).then(() => resolve());
                        break;
                    case "player":
                    case "team-player":
                        dispatch('deletePlayers', getters.elementsCheckedId).then(() => {
                            resolve()
                        });
                        break;
                    case "match":
                        dispatch('deleteMatches', getters.elementsCheckedId).then(() => resolve());
                        break;
                    // default:
                    //     console.log("Missing element type to delete").then(() => reject());
                }
            });
        }
    }
}