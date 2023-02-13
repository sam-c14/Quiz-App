<template>
  <div style="background-color: #007FAA;" class="relative">
  <header class="">
    <h1 class="font-bold text-white text-center sm:text-xl text-base py-3 capitalize">Sample Quiz</h1>
  </header>
  
  <section class="grid place-items-center">
    <div class="w-2/3 text-white my-2" v-for="(obj,index) in tempQuestionArr" :key="index">
        <p>{{ obj.id}}. {{ obj.question }}</p>
        <div class="flex justify-between sm:flex-row flex-col flex-wrap">
            <div v-for="(option,ind) in obj.options" ref="options" :id="obj.id + ind" :key="ind + parseInt(obj.id)" class="sm:w-1/2 w-full my-2 py-1 pb-2 border border-transparent px-1 hover:border-white border-dashed" @click="selectOption">
                <span><input type="radio" class="w-6 h-3" :name="obj.question"></span>
                <span class="text-sm font-light ml-1" v-text="option"></span>
            </div>
        </div>
    </div>
    <aside class="flex justify-between w-10/12">
        <div>
            <div class="border border-blue-200 shadow-sm p-0.5 update-btn rounded-md border-opacity-0 hover:border-opacity-100">
                <button @click="renderPreviousPage" class="py-2 px-3 rounded sm:text-sm text-xs bg-slate-600 text-white">Prev</button>
            </div>
        </div>
        <Pagination :arr="questionArr" :count="count" :counter="5" />
        <div>
            <div class="border border-blue-200 shadow-sm p-0.5 update-btn rounded-md border-opacity-0 hover:border-opacity-100">
                <button @click="renderNextPage"
                    class="py-2 px-3 rounded sm:text-sm text-xs bg-slate-600 text-white">Next</button>
            </div>
    </div>
    </aside>
  </section>
  <div class="grid place-items-center mt-3 pb-4">
   <span @click="endQuiz" class="p-0.5 rounded-md border-2 transition-all border-opacity-0 hover:border-opacity-100 border-white"><button @click="hasQuizEnded = true" class="px-5 py-3 text-white rounded-sm uppercase text-xs" style="background-color: #333E48;">done</button></span>
  </div>
  <div class="flex justify-center">
    <TimerVue :testDone="hasQuizEnded"/>
  </div>
</div>
</template>
<script>
import Pagination from '../components/Pagination.vue'
import TimerVue from '../components/Timer.vue'
export default {
    components : {Pagination, TimerVue},
    data(){
        return {
            questionArr: [
                {
                id : '1',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '2',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '3',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '4',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '5',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '6',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '7',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '8',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '9',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '10',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '11',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '12',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '13',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '14',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
                {
                id : '15',
                question : 'What is the capital of Germany?',
                options : ['India','Cameroon','Mali','France'],
                answer : 'France'
                },
            ],
            tempQuestionArr : [],
            count: 0,
            isUpdateBtnClicked: false,
            selectedOptions : [],
            hasQuizEnded : false
        }
    },
    mounted() {
        this.tempQuestionArr = [...this.questionArr.slice(0, 5)]
        this.count = this.tempQuestionArr.length
    },
    methods: {
        updateStorage() {
            if (this.isUpdateBtnClicked) {
                var attemptedQuestions = JSON.parse(sessionStorage.getItem("attemptedQuestions"))
                if (attemptedQuestions == null) attemptedQuestions = []
                attemptedQuestions.map(id => {
                    let option = document.getElementById(`${id}`)
                    if (option) {
                        option.firstElementChild.firstElementChild.setAttribute("checked", "true")
                        option.style.backgroundColor = "#004C66"
                        option.style.borderStyle = "solid"
                        option.lastElementChild.style.fontWeight = "500"
                    }
                })
                this.isUpdateBtnClicked = false
            }
        },
        selectOption(e) {
            const tags = [e.currentTarget.parentElement.firstElementChild.firstElementChild.firstElementChild, e.currentTarget.parentElement.firstElementChild.nextElementSibling.firstElementChild.firstElementChild, e.currentTarget.parentElement.lastElementChild.previousElementSibling.firstElementChild.firstElementChild, e.currentTarget.parentElement.lastElementChild.firstElementChild.firstElementChild]
            for (let tag of tags) {
                tag.removeAttribute("checked", "true")
                tag.parentElement.parentElement.style.backgroundColor = "transparent"
                tag.parentElement.parentElement.style.borderStyle = "dashed"
                tag.parentElement.nextElementSibling.style.fontWeight = "300"
            }
            e.currentTarget.firstElementChild.firstElementChild.setAttribute("checked", "true")
            e.currentTarget.style.backgroundColor = "#004C66"
            e.currentTarget.style.borderStyle = "solid"
            e.currentTarget.lastElementChild.style.fontWeight = "500"
        },
        renderPreviousPage() {
            if (this.count - 5 !== 0) {
                let startIndex = Number(this.tempQuestionArr[0].id) - 6
                this.tempQuestionArr = [...this.questionArr.slice(startIndex, this.count - 5)]
                this.count -= 5
                this.isUpdateBtnClicked = true
            }
        },
        renderNextPage() {
            if (this.count !== this.questionArr.length) {
                this.tempQuestionArr = [...this.questionArr.slice(this.count, this.count + 5)]
                this.count += 5
            }
            this.isUpdateBtnClicked = true
            sessionStorage.setItem("attemptedQuestions", JSON.stringify(this.selectedOptions))
        },
    },
    updated(){
        this.updateStorage()
    }
}
</script>
<style>
    
</style>