<template>
  <Banner :heroInfo="heroInfo" :count="1"/>

  <div class="w-full flex mt-5">
    <div class="flex justify-center flex-wrap w-full">
    <div v-for="(item,index) in quizImages.length" :key="item" :class="index % 2 == 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        class=" md:h-64 border w-4/5 md:w-11/12 h-1/2 lg:w-2/3 flex-col mb-5 hover:shadow-2xl overflow-hidden bg-black flex-nowrap flex quiz-card-2">
        <div class="w-full h-full">
            <img class="h-full w-full" :src="getImageUrl(quizImages[index])" alt="">
        </div>
        <div class="bg-white px-5 flex flex-wrap w-full h-full">
            <div class="w-full mt-1 flex flex-wrap justify-between">
                <p class="text-xs w-full text-black sm:block">{{ getCurrentDate }}</p>
                <p class="text-xs w-full text-blue-800">{{ getCountry }}</p>
            </div>
            <div class="w-full h-full pt-5 md:text-2xl text-black">
                <h1 class="font-semibold sm:w-full">{{ quizInfo[index]}}</h1>
                <div class="text-blue-700 h-2/5 pb-3 flex justify-end items-end"><Btn :icon="'right-long'"></Btn></div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import getImageUrl from "../utilities/mixins/getImageUrl"
import getCountry from '../utilities/mixins/getCountry'
import Btn from "../components/Btn.vue"
export default {
    components : { Banner,Btn},
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
    data(){
        return{
            quizImages: ["Art_Quiz_5.jpg", "Golf_Quiz.jpg", "History_Quiz_2.jpg", "History_Quiz.jpg", "Movie_Quiz_4.jpg", "OIP.jpg", "Science_Quiz_2.jpg","Food_Quiz_3.jpg","Geography_Quiz.jpg"],
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
            quizInfo: ["This quiz is based on arts", "Test your knowledge on different sports", "How much do you know music,  Click to Find out", "Test your info on history", "Like Movies? See your best movies", "Want to know more on general topics? Click here", "Science Geek? Find out more by clicking"],
        }
    }

}
</script>

<style>
@media (max-width:640px) {
    .quiz-card-2{
        height: 12.667% !important;
    }
}
.quiz-card-2:hover {
    transform: scale(1);
}
</style>