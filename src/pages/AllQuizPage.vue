<template>
    <div v-show="!isLoading">
        <Banner @change-img="changeBackground" :heroInfo="heroInfo" :count="count" />
        
        <div class="w-full flex my-5">
            <div class="flex justify-center flex-wrap w-full">
                <div v-for="(item, index) in quizImages.length" :key="item"
                    :class="index % 2 == 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
                    class="md:h-64 border w-4/5 md:w-11/12 xl:w-2/3 flex-col mb-0 hover:shadow-2xl overflow-hidden bg-black flex-nowrap flex quiz-card-2"
                    ref="quizCard">
                    <div class="w-full h-full">
                        <img class="h-full w-full" :src="getImageUrl(quizImages[index])" alt="">
                    </div>
                    <div class="bg-white  flex flex-wrap w-full h-full">
                        <div class="w-full px-5 mt-1 lg:mt-1 md:mt-5 flex flex-wrap justify-between">
                            <p class="text-xs font-bold lg:w-auto md:w-full mb-0 md:mb-0.5 lg:mb-0 w-auto text-black sm:block">
                                {{ getCurrentDate }}</p>
                            <p class="text-xs font-semibold lg:w-auto md:w-full mb-0 lg:mb-0 w-auto text-blue-800">{{ getCountry
                                }}</p>
                        </div>
                        <div class="w-full px-5 h-full pt-5 lg:text-2xl md:text-xl text-black">
                            <h1 class="font-semibold sm:w-full">
                                {{ quizInfo[index]}}
                            </h1>
                            <div class="text-blue-700 mt-2 mb-3 h-1/2 flex justify-end items-start">
                                <Btn class="quiz-card-2" :icon="'right-long'"></Btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div ref="loaderContainer" class="fixed hide w-full flex justify-center items-center h-screen bg-slate-100" v-if="isLoading">
        <LoadingIcon />
    </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import getImageUrl from "../utilities/mixins/getImageUrl"
import getCountry from '../utilities/mixins/getCountry'
import Btn from "../components/Btn.vue"
import LoadingIcon from "../assets/icons/LoadingIcon.vue"
export default {
    components: { Banner, Btn, LoadingIcon },
    mixins: [getImageUrl, getCountry],
    computed: {
        getCurrentDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1); //January is 0!
            var yyyy = today.getFullYear();
            return `${dd} ${this.months[mm]} ${yyyy}`
        }
    },
    data() {
        return {
            quizImages: ["Art_Quiz_5.jpg", "Golf_Quiz.jpg", "History_Quiz_2.jpg", "History_Quiz.jpg", "Movie_Quiz_4.jpg", "OIP.jpg", "Science_Quiz_2.jpg", "Food_Quiz_3.jpg", "Geography_Quiz.jpg"],
            heroInfo: [
                {
                    header: "Check out the Available quizzes for you to play",
                    btnContent: "View Quiz"
                },
                {
                    header: "Learn more about our Quiz, Read Now!!!",
                    btnContent: " About Section"
                },
                {
                    header: "Configure Your Quizzes",
                    btnContent: "Go to Quiz Section"
                },
            ],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            quizInfo: ["This quiz is based on arts", "Test your knowledge on different sports", "How much do you know music,  Click to Find out", "Do you truly know the ancients? Click to find out", "Check your best movies and try interesting questions", "Want to know more on general topics? Click here", "How much do you know it Geek? Find out more by clicking","Think you know food cause you're eating it? Lets see how much you really know","Our true science geeks,Test your knowledge on geographic questions"],
            firstMount: false,
            count : 0,
            isLoading : true
        }
    },
    beforeMount() {
        this.firstMount = JSON.parse(localStorage.getItem("firstMount"))
        if (!this.firstMount){
            this.isLoading = true
            window.scrollTo(0, 0) 
            this.firstMount = true
            localStorage.setItem("firstMount", JSON.stringify(this.firstMount))
        }
        else{
            if (this.isLoading) {
                setTimeout(() => {
                    this.$refs.loaderContainer.style.width = "0%"
                    setTimeout(() => {
                        this.isLoading = false
                    }, 1000)
                }, 2000)
            }
        }
    },
    mounted(){
        this.$refs.quizCard.map(card=>{
            card.addEventListener("mouseover",()=>{
                card.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.transform = "scale(1.2)"
            })
            card.addEventListener("mouseout",()=>{
                card.lastElementChild.lastElementChild.lastElementChild.lastElementChild.style.transform = "scale(1)"
            })
        })
    },
    beforeRouteLeave(to, from, next) {
        localStorage.clear()
        next()
    },
    methods : {
        changeBackground(num){
            this.count = num
        }
    }

}
</script>

<style>
.quiz-card-2{
    transition: all .5s;
}
.hide{
    transition: all 2s;
}
</style>