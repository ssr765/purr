import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: () => import('../views/landing/HomeView.vue')
        },
        {
            path: '/app',
            name: 'appHome',
            component: () => import('../layouts/GlobalInterface.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/app/HomeView.vue')
                },
                {
                    path: 'test',
                    name: 'fullPost',
                    component: () => import('../views/app/FullPostView.vue')
                },
                {
                    path: 'explorar',
                    name: 'explorar',
                    component: () => import('../views/app/ExplorarView.vue')
                }
            ]
        }
    ]
})

export default router
