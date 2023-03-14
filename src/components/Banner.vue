<template>
  <div
    style="height: 90vh"
    class="relative flex justify-center scroll-smooth no-scroll"
  >
    <div
      class="w-full flex flex-wrap absolute h-full"
      ref="bannerImage"
      v-for="(classes, index) in imgClasses"
      :key="classes"
    >
      <Transition name="fade">
        <div class="w-full h-full" :class="classes" v-if="index == count">
          <div
            class="flex h-full pl-2 w-full sm:w-3/5 sm:pl-1 justify-end flex-wrap items-center"
          >
            <HeroContent class="z-30 pl-2 w-auto">
              <template #header>
                <h1 class="text-white text-xl sm:text-2xl font-semibold my-1"
                  >{{ heroInfo[index].header }}
                </h1>
              </template>

              <template #btn-slot>
                <router-link :to="heroInfo[index].route">
                  <button
                    class="p-3 py-2 w-10/12 sm:w-auto text-xs sm:text-sm hover:bg-blue-500 btn hover:text-white font-normal tracking-wider rounded-full text-blue-600 bg-white my-1"
                  >
                    {{ heroInfo[index].btnContent
                    }}<span class="ml-1">
                      <Btn :icon="'right-long'"></Btn>
                    </span>
                  </button>
                </router-link>
              </template>
            </HeroContent>
          </div>
        </div>
      </Transition>
    </div>
    <div class="pb-3 z-10 flex items-end justify-end w-10/12">
      <Pagination
        @change-background="changeImg"
        :arr="imgClasses"
        :count="count + 1"
        :counter="1"
      />
    </div>
  </div>
</template>
<script>
import HeroContent from "../components/HeroContent.vue";
import Btn from "../components/Btn.vue";
import Pagination from "../components/Pagination.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
export default {
  components: { HeroContent, Btn, Pagination },
  mixins: [getImageUrl],
  props: {
    heroInfo: Array,
    count: Number,
  },
  data() {
    return {
      imgClasses: ["image-1", "image-2", "image-3"],
    };
  },
  methods: {
    changeImg(n) {
      this.$emit("change-img", n);
    },
  },
};
</script>
<style>
.image-1 {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url("../assets/images/pexels-ivan-samkov-4240497.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}

.image-2 {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url("../assets/images/pexels-jakub-novacek-924824.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}

.image-3 {
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)),
    url("../assets/images/pexels-lil-artsy-1394646.jpg") no-repeat;
  background-position: center;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.no-scroll {
  overflow: hidden;
}
</style>
