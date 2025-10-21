<script setup lang="ts">
    import { computed, ref } from 'vue';

    interface IItem { type: string, name: string }

    const props = defineProps({
        type: String,
        items: Object,
        selected: String
    });

    const emits = defineEmits(["on:select"])

    const isOpened = ref(false);
    const currentItem = computed(() => {
        if (!props || !props.items) return null;
        return props.items.find((v: IItem) => v.type == props.selected);
    });

    function onChangeState() {
        isOpened.value = !isOpened.value;
    }

    function onChooseVariant(item: IItem) {
        emits("on:select", item.type);
        isOpened.value = false;
    }
</script>

<template>
    <div class="relative">
        <div @click="onChangeState()" class="bg-white border-1 border-[#cad5e2] pt-2 pb-2 pl-3 pr-3 w-fit flex items-center gap-2 rounded-md cursor-pointer">
            <span class="base-icon icon-color-title-100 w-4 h-4" v-html="currentItem ? $icon(currentItem.icon) : ''"></span>
            <span class="color-title-100 font-medium text-[1rem]">{{ currentItem ? currentItem.name : "Выберите тип" }}</span>
        </div>

        <Transition name="slide">
            <div v-if="isOpened" class="absolute max-w-3xs bg-white border-1 border-[#E2E8F0] rounded-md grid mt-1.5">
                <div class="dropdown-group">
                    <div v-for="item in items" class="p-2 flex items-center gap-2 cursor-pointer" @click="onChooseVariant(item)">
                        <span class="base-icon icon-color-title-100 opacity-50 w-4 h-4" v-html="$icon(item.icon)"></span>
                        <span class="color-title-100 font-medium text-[1rem]">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style>
.dropdown-group:not(:last-child) {
    border-bottom: 1px solid #E2E8F0;
}

.slide-enter-active, .slide-leave-active {
  transition: .3s ease;
  transition-property: transform, opacity;
}

.slide-enter-from, .slide-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}
</style>