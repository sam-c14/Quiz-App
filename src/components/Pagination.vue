<template>
  <slot>
    <div class="flex w-12 z-40 justify-between items-center">
      <div
        @click="$emit('change-background', num - 1)"
        v-for="num in arr.length / counter"
        :key="num"
        class="sm:h-3 sm:w-1/4 h-2 w-1/6 rounded-full"
      >
        <div
          class="w-full cursor-pointer rounded-full h-full"
          :class="num == count / counter ? 'bg-black' : 'bg-white'"
        ></div>
      </div>
    </div>
  </slot>
</template>

<script>
export default {
  props: {
    arr: Array,
    counter: Number,
    count: Number,
  },
};
</script>
