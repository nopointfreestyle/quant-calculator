<script setup lang="ts">
import { useRouter } from 'vue-router';

    const router = useRouter();

    function onBack() {
        router.push("/");
    }
</script>

<template>
    <header class="bg-white sticky top-0 flex flex-col z-50">
        <div class="w-full max-w-(--ui-container) pb-5 pt-5 pl-10 pr-10 flex mx-auto justify-between">
            <div class="flex items-center gap-2.5" @click="onBack()">
                <img src="@/assets/images/logo.png" alt="" class="w-10 h-10 pointer-events-none">
                <span class="text-2xl font-bold color-title-100">Quant Calculator</span>
            </div>

            <div class="flex">
                <a href="https://github.com/nopointfreestyle/quant-calculator">
                    <span class="icon-color-title-50 hover:icon-color-title-100" v-html="$icon('github')"></span>
                </a>
            </div>
        </div>
    </header>
</template>

<style>
</style>