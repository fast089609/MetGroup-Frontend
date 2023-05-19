import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginUser from '../views/usuarios/LoginUser.vue'
import RegistrarUsuario from '../views/usuarios/RegistrarUsuario.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginUser,
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: RegistrarUsuario,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken') || null

  if ((to.name != 'login' && to.name != 'registrar') && token == null) return next({ name: 'login' })

  if ((to.name == 'login' || to.name == 'registrar') && token != null) return next({ name: 'home' })

  if (to.meta.auth) return token != null ? next() : next({ name: 'login' })

  next()
})

export default router
