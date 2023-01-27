<template>
    <section class="my-10 relative">
        <h1 id="card-content" class="text-2xl md:text-3xl lg:text-5xl font-semibold text-center">Our Quiz</h1>
        <div class="absolute z-30 flex justify-between top-52 w-full">
            <span :class="isScrolled ? 'opacity-100' : 'opacity-0'" class="text-4xl bg-white  p-3 rounded-full text-black"
                @click="scrollLeft">
                <Btn :icon="'left'"></Btn>
            </span>
            <span class="bg-white p-3 rounded-full text-black" @click="scrollRight">
                <Btn :icon="'right'"></Btn>
            </span>
        </div>
        <div @wheel.prevent
            class="grid mt-5 grid-flow-col pl-5 lg:pl-36 scroll-smooth gap-x-3 relative quiz-card-container overflow-x-auto py-4"
            ref="quizCardContainer">
            <div v-for="(item,index) in quizCount" :key="item"
                class="lg:h-96 lg:w-72 md:h-60 md:w-44 h-64 w-48  overflow-hidden  shadow-md flex-wrap flex quiz-card bg-blue-300">
                <div class="w-full h-3/4">
                    <img class="h-full w-full" :src="getImageUrl(quizImages[index])" alt="">
                </div>
                <div class="bg-white px-5 flex flex-wrap w-full h-1/4">
                    <div class="w-full flex justify-between">
                        <p class="text-xs text-black sm:block hidden">This is date</p>
                        <p class="text-xs text-blue-600">This is Country</p>
                    </div>
                    <div class="w-full text-black">
                        <h1 class="font-normal sm:w-full w-1/3 text-xs lg:text-sm">This Quiz is based on the history of different Countries</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-4 pr-2 w-10/12 flex justify-end">
            <div class="">
                <Btn :direction="'right-long'" :icon="'btn'">View All Quizzes</Btn>
            </div>
        </div>
    </section>
</template>
<script>
import Btn from "../components/Btn.vue"
import getImageUrl from "../utilities/getImageUrl"
export default {
    components : {Btn},
    mixins: [getImageUrl],
    props : {
        quizImages : Array
    },
    data(){
        return {
            isScrolled : false,
            quizCount: [1, 2, 3, 4, 5, 6, 7],
        }
    },
    methods: {
        scrollRight() {
            let quizCardContainer = this.$refs.quizCardContainer
            quizCardContainer.scrollLeft += 500;
            !this.isScrolled ? this.isScrolled = true : ''
        },
        scrollLeft() {
            let quizCardContainer = this.$refs.quizCardContainer
            quizCardContainer.scrollLeft -= 500;
            quizCardContainer.scrollLeft <= 0 ? this.isScrolled = false : ''
        }
    }  
}
</script>