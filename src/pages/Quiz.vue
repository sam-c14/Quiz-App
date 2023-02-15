<template>
    <div style="background-color: #007FAA;" class="relative">
  <header class="">
    <h1 class="font-bold text-white text-center sm:text-xl text-base py-3 capitalize">Quiz - {{ category }}</h1>
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
        <Pagination :arr="questions" :count="count" :counter="5" />
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
      <TimerVue :testDone="hasQuizEnded" />
  </div>
</div>


<ResultModal v-if="endQuizSession">
    <template #header>
        <h1 class="m-1">Yayy You Completed the quiz!!!</h1>
        <p class="m-1">Lorem ipsum dolor sit amet.</p>
    </template>
    
    <template #main>
        <div class=" text-center my-4 flex justify-center">
            <div class="border happy-text text-white text-sm bg-blue-500  rounded-full p-2 w-1/3 py-7">
                Yayy
            </div>
        </div>
    </template>
    
    <template #footer>
        <button @click="changeRoute('result',{score : result,resultArr : JSON.stringify(resultData)})"
            class="w-full my-2 hover:bg-blue-800 transition-all bg-blue-900 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer">Click
            Here to see the results</button>
    </template>
</ResultModal>
</template>

<script>
import ResultModal from "../components/Modal.vue"
import Pagination from "../components/Pagination.vue"
import getQuestions from "../utilities/mixins/getQuestions"
import changeRoute from "../utilities/mixins/changeRoute"
import TimerVue from '../components/Timer.vue'
export default {
    components: { ResultModal, Pagination, TimerVue },
    mixins : [getQuestions,changeRoute],
    data(){
        return {
            count : 0,
            tempQuestionArr : [],
            selectedOptions : [],
            isUpdateBtnClicked : false,
            result : 0,
            resultAnalysis:{},
            resultData : [],
            endQuizSession : false,
            error :'',
            questions: '',
            category : this.$route.params.category,
            hasQuizEnded: false
        }
    },
    mounted(){
        this.tempQuestionArr = [...this.questions.slice(0, 5)]
        this.count = this.tempQuestionArr.length
    },
    updated(){
        this.updateStorage()
        if(this.endQuizSession == true){
            this.$refs.options.map(option => {
                option.removeEventListener("click",this.selectOption)
                if (this.resultAnalysis[option.id] !== undefined) {
                    if (this.resultAnalysis[option.id]) {
                        option.firstElementChild.firstElementChild.setAttribute("checked", "true")
                        option.style.backgroundColor = "#00526d"
                        option.style.border = "3px solid green"
                        option.lastElementChild.style.fontWeight = "500"
                        option.classList.add("end-quiz")
                    }
                    else {
                        option.firstElementChild.firstElementChild.removeAttribute("checked", "true")
                        option.style.backgroundColor = "#006283e8"
                        option.style.borderStyle = "dashed"
                        option.style.borderColor = "red"
                        option.lastElementChild.style.fontWeight = "300"
                        option.classList.add("end-quiz")
                    }
                }
                sessionStorage.clear()
            })
        }
    },
    methods:{
        updateStorage(){
            if (this.isUpdateBtnClicked) {
                var attemptedQuestions = JSON.parse(sessionStorage.getItem("attemptedQuestions"))
                if(attemptedQuestions == null && this.endQuizSession)  attemptedQuestions = []
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
        selectOption(e){
            const tags = [e.currentTarget.parentElement.firstElementChild.firstElementChild.firstElementChild, e.currentTarget.parentElement.firstElementChild.nextElementSibling.firstElementChild.firstElementChild, e.currentTarget.parentElement.lastElementChild.previousElementSibling.firstElementChild.firstElementChild, e.currentTarget.parentElement.lastElementChild.firstElementChild.firstElementChild]
            for(let tag of tags){
                tag.removeAttribute("checked","true")
                tag.parentElement.parentElement.style.backgroundColor = "transparent"
                tag.parentElement.parentElement.style.borderStyle = "dashed"
                tag.parentElement.nextElementSibling.style.fontWeight = "300"
            }
            e.currentTarget.firstElementChild.firstElementChild.setAttribute("checked", "true")
            e.currentTarget.style.backgroundColor = "#004C66"
            e.currentTarget.style.borderStyle = "solid"
            e.currentTarget.lastElementChild.style.fontWeight = "500"
            var id = e.currentTarget.id
            this.filterOptions(id)
        },
        renderPreviousPage(){
            if (this.count - 5 !== 0) {
                let startIndex = Number(this.tempQuestionArr[0].id) - 6
                this.tempQuestionArr = [...this.questions.slice(startIndex, this.count - 5)]
                this.count -= 5
                this.isUpdateBtnClicked = true
            }
        },
        renderNextPage(){
            if(this.count !== this.questions.length){
                this.tempQuestionArr = [...this.questions.slice(this.count, this.count + 5)]
                this.count += 5
            }
            this.isUpdateBtnClicked = true
           sessionStorage.setItem("attemptedQuestions",JSON.stringify(this.selectedOptions))
        },
        filterOptions(id){
            this.selectedOptions = this.selectedOptions.filter(options=>{
                if (!options.startsWith(id[0])) return options
                else if (options.startsWith(id[0])){
                    if (options.length !== id.length || !options.startsWith(id.slice(0,2))) return options
                }
            }) 
            this.selectedOptions.push(id)
        },
        endQuiz(){
            let answers = []
            let questionId = []
            this.selectedOptions.map(option=>{
                let answer = option.substring(option.length - 1, option.length)
                answers.push(answer)
                option = option.slice(0, option.length - 1)
                questionId.push(option)
            })
            this.endQuizSession = true
            this.questions.map(question=>{
                // checks that the question was attempted
                if(questionId.includes(question.id)){
                    let index = questionId.indexOf(question.id)
                    if(question.options[answers[index]] == question.answer) {
                        this.result++
                        this.resultAnalysis[`${question.id}${answers[index]}`] = true
                        this.resultData.push({ question: question.question, selectedOption: question.options[answers[index]], answer: question.answer })
                    }
                    else {
                        this.resultData.push({ question: question.question, selectedOption: question.options[answers[index]], answer: question.answer })
                        this.resultAnalysis[`${question.id}${answers[index]}`] = false
                        this.resultAnalysis[`${question.id}${question.options.indexOf(question.answer)}`] = true
                    }
                }
                else{
                    this.resultData.push({ question: question.question, selectedOption: "None", answer: question.answer })
                }
            })
        },
        setData(error, questions) {
            if (error) {
                this.error = error
            } else {
                this.questions = questions
            }
        }
    },

    beforeRouteEnter(to, from, next) {
        getQuestions(to.params.category,to.params.difficulty, (err, questions) => {
            // `setData` is a method defined below
            next(vm => vm.setData(err, questions))
        })
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    async beforeRouteUpdate(to, from) {
        this.questions = null
        try {
            this.questions = await getQuestions(to.params.category,to.params.difficulty)
        } catch (error) {
            this.error = error.toString()
        }
    },

}
</script>

<style>
.update-btn:hover{
    transform: scale(1.05);
}
.update-btn{
    transition : all .2s
}
.end-quiz{
    --tw-border-opacity: 1 !important;
}
</style>