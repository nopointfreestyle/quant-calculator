<script setup lang="ts">
    import HeaderComponent from "@/components/Header/HeaderComponent.vue";
    import { RouterView } from "vue-router"
</script>

<template>
    <div class="flex flex-col pb-10">
        <HeaderComponent />

        <main class="flex flex-col gap-12">
            <svg viewBox="0 0 1440 181" fill="none" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute w-full transition-all text-primary shrink-0 -z-10 duration-[400ms]"><mask id="path-1-inside-1_414_5526" fill="white"><path d="M0 0H1440V181H0V0Z"></path></mask><path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.22"></path><path d="M0 2H1440V-2H0V2Z" fill="url(#paint1_linear_414_5526)" mask="url(#path-1-inside-1_414_5526)"></path><defs><linearGradient id="paint0_linear_414_5526" x1="720" y1="0" x2="720" y2="181" gradientUnits="userSpaceOnUse"><stop stop-color="#3B68FC"></stop><stop offset="1" stop-color="#3B68FC" stop-opacity="0"></stop></linearGradient><linearGradient id="paint1_linear_414_5526" x1="0" y1="90.5" x2="1440" y2="90.5" gradientUnits="userSpaceOnUse"><stop stop-color="#3B68FC" stop-opacity="0"></stop><stop offset="0.395" stop-color="#3B68FC"></stop><stop offset="1" stop-color="#3B68FC" stop-opacity="0"></stop></linearGradient></defs></svg>
        
            <RouterView class="max-w-(--ui-container) mx-auto pl-10 pr-10 pt-20" />
        </main>
    </div>
</template>

<style lang="scss">

</style>