<template>
    <button v-if="icon == 'btn'"
        class="p-3 py-2 text-center hover:bg-blue-500 hover:text-white text-xs btn rounded-full uppercase text-blue-500 border  border-blue-500 bg-white my-1">
        <span class="mr-3 inline-block mt-1"><slot></slot></span><span class="">
            <ArrowLeftIcon v-if="direction == 'left'" />
            <ArrowRightIcon v-else-if="direction == 'right'" />
            <ArrowRightLongIcon v-else-if="direction == 'right-long'" />
            <ArrowDownIcon v-else />
        </span>
    </button>
    <ArrowLeftIcon v-else-if="icon == 'left'" />
    <ArrowRightIcon v-else-if="icon == 'right'" />
    <ArrowRightLongIcon v-else-if="icon == 'right-long'" />
    <ArrowDownIcon v-else />
</template>
<script>
import ArrowRightIcon from "../assets/icons/ArrowRightIcon.vue"
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon.vue"
import ArrowDownIcon from "../assets/icons/ArrowDownIcon.vue"
import ArrowRightLongIcon from "../assets/icons/ArrowRightLongIcon.vue"

export default {
    props : {
        direction : String,
        icon : String
    },
    components : {ArrowRightIcon,ArrowLeftIcon,ArrowDownIcon,ArrowRightLongIcon}
}
</script>