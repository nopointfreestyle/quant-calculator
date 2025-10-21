import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import HomeView from "../views/HomeView.vue";
import MathVectorsCalculatorView from "../views/calculators/MathVectors/MathVectorsCalculatorView.vue";

const routes: Readonly<RouteRecordRaw[]> = [
    { path: '/', component: HomeView },
    { path: '/math-vectors', component: MathVectorsCalculatorView }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})