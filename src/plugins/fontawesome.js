import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faPlus, faTrashAlt, faChevronLeft, faSearch, faUser, faUserCircle, faSignOutAlt, faPlay, faUsers, faUserPlus, faStopwatch20, faStopwatch, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen, faPlus, faTrashAlt, faSquare, faCheckSquare, faChevronLeft, faSearch, faUser, faUserCircle, faSignOutAlt, faPlay, faUsers, faUserPlus, faStopwatch20, faStopwatch, faDoorOpen) // añade iconos de fontawesome a libreria

Vue.component('fa-icon', FontAwesomeIcon) // definimos el componente <fa-icon> para usar los iconos en los templates