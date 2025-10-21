<script setup lang="ts">
    import { BaseCalculator, BaseFormula, Calculators, InputBoxForm } from "@/calculators";
    import { ref, defineProps, defineEmits, Transition } from "vue";

    const props = defineProps({
        type: String,
        formula: String,
    });

    const emits = defineEmits(["on:solution"]);

    const calculator = ref<BaseCalculator>(Calculators.find(v => v.type == props.type) as BaseCalculator);
    const formula = ref(calculator.value.formulas.find(v => v.type == props.formula) as BaseFormula);

    const answers = ref(Object.fromEntries(formula.value.forms.map(item => {
        return item.boxes.filter(v => v instanceof InputBoxForm).map(box => {
            return [box.type, box.value]
        });
    }).flat()));

    const solutionResult = ref(null);

    function onMake() {
        const value = formula.value?.getSolution(answers.value);
        solutionResult.value = value;

        emits("on:solution", value, formula.value, answers.value)
    }
</script>

<template>
    <section class="grid gap-2.5 h-fit">
        <section class="bg-white w-full max-w-[390px] p-5 rounded-2xl border-1 border-[#E2E8F0] flex flex-col h-fit gap-3">
            <div class="flex flex-col gap-1.5" v-for="form in formula.forms">
                <span class="color-subtitle-100 font-bold text-[1.25rem]">{{ form.title }}</span>
                <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
                    <div v-for="box in form.boxes" class="flex w-full">
                        <div v-if="box instanceof InputBoxForm" class="flex w-full items-center gap-1.5 bg-white border-1 border-[#cad5e2] pl-3 pr-3 pt-2 pb-2 rounded-md">
                            <span class="text-[16px] font-medium color-subtitle-100">{{box.icon }}</span>
                            <input 
                                class="w-full text-[18px] placeholder:text-[#90a1b9] color-title-100 font-medium outline-none border-none" 
                                v-model="answers[box.type]"
                                :placeholder="box.placeholder" 
                                :type="box.inputType" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button 
                class="w-fit bg-main-100 color-white text-[1.25rem] font-[500] pl-3 pr-3 pt-2 pb-2 rounded-md outline-none hover:opacity-75 transition-[opacity] cursor-pointer"
                @click="onMake">
                Вычислить
            </button>
        </section>

        <Transition name="solution-result">
            <section
                v-if="solutionResult"
                class="bg-white w-full max-w-[390px] p-5 rounded-2xl border-1 border-[#E2E8F0] grid gap-3">
                <div class="grid gap-2.5">
                    <span class="text-xl font-bold color-title-100">Ответ</span>
                    <span class="text-md font-semibold color-subtitle-100">{{ solutionResult }}</span>
                </div>
            </section>
        </Transition>
    </section>
</template>

<style>
.solution-result-enter-active,
.solution-result-leave-active {
  transition: opacity .3s ease, transform .3s ease; /* Adjust duration and easing as needed */
}

/* Starting state for entering element and ending state for leaving element */
.solution-result-enter-from,
.solution-result-leave-to {
  opacity: 0;
  transform: translateY(20px); /* Adjust slide direction and distance */
}

/* Ending state for entering element and starting state for leaving element */
.solution-result-enter-to,
.solution-result-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>