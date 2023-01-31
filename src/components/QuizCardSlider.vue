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
        <div @wheel="preventHorizontalScroll"
            class="grid mt-5 grid-flow-col pl-5 lg:pl-36 scroll-smooth z-0 gap-x-3 relative quiz-card-container overflow-x-auto py-4"
            ref="quizCardContainer">
            <div @click="selectQuiz(index)" v-for="(item,index) in quizImages.length" :key="item"
                class="lg:h-96 lg:w-72 md:h-60 md:w-44 h-64 w-48  overflow-hidden bg-black shadow-md flex-wrap flex quiz-card">
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
        <QuizModal v-if="quizSelected">
            <template #header>
                <button @click="this.quizSelected = false"
                    class="w-full my-2 hover:bg-blue-900 transition-all bg-blue-800 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer">Go Back</button>
                <h1 class="my-2">You've selected the <span class="capitalize">{{ category }}</span> Quiz</h1>
                <h1 class="my-2 font-semibold">Select Your Difficulty Level Below:</h1>
            </template>
        
            <template #main>
                <div>
                    <div class="flex gap-2 items-center">
                        <input v-model="difficulty" type="radio" class="h-3 w-3" name="difficulty-level" value="easy" id="" />
                        <label class="font-bold">Easy</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input v-model="difficulty" type="radio" class="h-3 w-3" name="difficulty-level" value="medium" id="" />
                        <label class="font-bold">Medium</label>
                    </div>
                    <div class="flex gap-2 items-center">
                        <input v-model="difficulty" type="radio" class="h-3 w-3" name="difficulty-level" value="hard" id="" />
                        <label class="font-bold">Hard</label>
                    </div>
                </div>
            </template>
        
            <template #footer>
            <button @click="startQuiz"
                class="w-full my-2 hover:bg-blue-800 transition-all bg-blue-900 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer">Go to Quiz</button>
            </template>
        </QuizModal>
        <div class="my-4 pr-2 w-10/12 flex justify-end">
            <div class="">
                <Btn :direction="'right-long'" :icon="'btn'">View All Quizzes</Btn>
            </div>
        </div>
    </section>
</template>
<script>
import Btn from "../components/Btn.vue"
import getImageUrl from "../utilities/mixins/getImageUrl"
import QuizModal from "../components/Modal.vue"
import changeRoute from "../utilities/mixins/changeRoute"
export default {
    components: { Btn, QuizModal },
    mixins: [getImageUrl, changeRoute],
    props : {
        quizImages : Array
    },
    data(){
        return {
            isScrolled : false,
            categories: ["arts", "sports", "music", "history", "movies", "general_knowledge", "science"],
            difficulty : '',
            quizSelected : false,
            category : ''
        }
    },
    mounted(){},
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
        },
        selectQuiz(index){
            this.quizSelected = true
            this.category = this.categories[index]
        },
        startQuiz(){
            this.changeRoute('login', { category: this.category, difficulty: this.difficulty })
        },
        preventHorizontalScroll(e){
            e.preventDefault();
            let quizCardContainer = this.$refs.quizCardContainer
            quizCardContainer.scrollTop += e.deltaY;
        }
    }  
}
</script>