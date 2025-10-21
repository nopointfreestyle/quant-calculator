<script setup lang="ts">
    import { ref } from 'vue';
    import { BaseCalculator, BaseFormula, Calculators } from '@/calculators';
    import type { GraphVector } from '@/calculators/math-vectors/models/graph-vector';
    import DropdownList from '../DropdownList.vue';
    import Graph from '../Graph.vue';
    import FormBox from '../FormBox.vue';

    const calculatorType = ref("math-vectors");

    const calculator = ref(Calculators.find(v => v.type == calculatorType.value) as BaseCalculator);
    const selectedFormula = ref(`${calculator.value.formulas[0]?.type}`);

    const graphVectors = ref<GraphVector[]>([]);

    function onSelectFormula(type: string) {
        selectedFormula.value = type;
        graphVectors.value = [];
    }

    function onSolution(_result: any, formula: BaseFormula, answers: Record<string, number>) {
        graphVectors.value = formula.getGraphVectors(answers);

        console.log(graphVectors.value)
    }
</script>
 
<template>
    <div class="w-fit flex flex-col gap-12">
        <div>
            <h2 class="color-title-100 text-4xl font-bold">Векторный калькулятор</h2>
        </div>

        <div class="grid gap-2.5">
            <DropdownList :type="calculatorType" :items="calculator.formulas" :selected="selectedFormula" @on:select="onSelectFormula" />

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <FormBox :type="calculatorType" :formula="selectedFormula" :key="selectedFormula" @on:solution="onSolution" />
                <Graph :vectors="graphVectors" />
            </div>
        </div>
    </div>
</template>