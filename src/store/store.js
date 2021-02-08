import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import api from './modules/api';
import liveMatch from './modules/liveMatch';
import users from './modules/appElements/users';
import clubs from './modules/appElements/clubs';
import teams from './modules/appElements/teams';
import players from './modules/appElements/players';
import matches from './modules/appElements/matches';
import actions from './modules/appElements/actions';
import tabs from './modules/tabs';
import checkboxes from './modules/checkboxes';
import creatingEditing from './modules/creatingEditing';
import footer from './modules/footer';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [
      "liveMatch",
      "users",
      "clubs",
      "teams",
      "players",
      "matches",
      "actions",
      "tabs",
      "checkboxes",
      "creatingEditing",
      "footer"]
  })],
  modules: {
    api,
    liveMatch,
    users,
    clubs,
    teams,
    players,
    matches,
    actions,
    tabs,
    checkboxes,
    creatingEditing,
    footer
  },
  state: {
    weekDays: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte']
  },
  getters: {
    weekDays(state) {
      return state.weekDays;
    }
  },
  mutations: {
  },
  actions: {
    resetApp({ dispatch }) {
      dispatch('resetElementsChecked');
      dispatch('setUser', null);
      dispatch('setTeam', {});
      dispatch('setTeams', []);
      dispatch('setPlayer', {});
      dispatch('setPlayers', []);
      dispatch('setPlayerTeams', []);
      dispatch('setMatch', {});
      dispatch('setPendingMatches', []);
      dispatch('setInProgressMatches', []);
      dispatch('setEndedMatches', []);
      dispatch('setClub', {});
      dispatch('setClubs', []);
      dispatch('setShot', {});
      dispatch('setSave', {});
    }
  },
})
