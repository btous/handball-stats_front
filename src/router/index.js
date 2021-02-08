import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Club from '@/views/Club.vue'
import Team from '@/views/Team.vue'
import Player from '@/views/Player.vue'
import Match from '@/views/Match.vue'
import ClubFormView from '@/views/ClubFormView.vue'
import TeamFormView from '@/views/TeamFormView.vue'
import PlayerFormView from '@/views/PlayerFormView.vue'
import MatchFormView from '@/views/MatchFormView.vue'
import LiveMatch from '@/views/LiveMatch.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/club', name: 'Club', component: Club },
  { path: '/team', name: 'Team', component: Team },
  { path: '/player', name: 'Player', component: Player },
  { path: '/match', name: 'Match', component: Match },
  { path: '/create-club', name: 'ClubFormView', component: ClubFormView },
  { path: '/edit-club', name: 'ClubFormView', component: ClubFormView },
  { path: '/create-team', name: 'TeamFormView', component: TeamFormView },
  { path: '/edit-team', name: 'TeamFormView', component: TeamFormView },
  { path: '/create-player/:team?', name: 'PlayerFormView', component: PlayerFormView },
  { path: '/edit-player', name: 'PlayerFormView', component: PlayerFormView },
  { path: '/create-match/', name: 'MatchFormView', component: MatchFormView },
  { path: '/edit-match', name: 'MatchFormView', component: MatchFormView },
  { path: '/live-match', name: 'LiveMatch', component: LiveMatch },
  { path: '*', name: 'NotFound', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
