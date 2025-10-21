<script setup lang="ts">
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { Calculators } from "@/calculators";

    const router = useRouter();
    const calculators = ref(Calculators);

    function onOpenCalculator(type: string) {
        router.push(`/${type}`);
    }
</script>

<template>
    <div class="w-full flex flex-col gap-12">
        <h1 class="text-6xl font-bold color-title-100">
            <span class="color-main-100">Quant</span> - Лучше чем <br> обычный калькулятор
        </h1>

        <section class="bg-white grid grid-cols-1 p-5 gap-5 rounded-2xl lg:grid-cols-3">
            <button v-for="item in calculators" 
                class="type-element bg-[#f8f9fd] border-[#D7DBEA] border-[2px] rounded-2xl 
                flex flex-col items-center justify-center gap-5 h-56 transition-[background]"
                @click="onOpenCalculator(item.type)">
                <div class="flex flex-col items-center gap-2.5">
                    <div class="base-icon w-16 h-16 icon-color-main-100" v-html="$icon(item.icon)"></div>
                    <span class="color-title-100 text-2xl font-bold transition-[color]">{{ item.title  }}</span>
                </div>

                <span class="text-[1rem] font-medium color-subtitle-100 transition-[color]">{{ item.formulas.length }} формул</span>
            </button>
        </section>
    </div>
</template>

<style lang="scss">
.type-element {
    &:hover {
        background: var(--color-main-100);
        cursor: pointer;
        
        .base-icon {
            --svg-icon-color: var(--color-white);
        }

        span {
            color: var(--color-white)
        }
    }
}
</style>