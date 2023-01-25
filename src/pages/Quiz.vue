<template>
    <div style="background-color: #007FAA;" class="relative">
  <header class="">
    <h1 class="font-bold text-white text-center sm:text-xl text-base py-3">Quiz - Capitals Of The World</h1>
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
        <div class="flex w-12 justify-between items-center">
            <div v-for="num in questions.length / 5" :key="num" class="sm:h-3 sm:w-1/4 h-2 w-1/6 rounded-full"><div class="w-full rounded-full h-full" :class="num == count/5?'bg-black':'bg-white'"></div></div>
        </div>
        <div>
            <div class="border border-blue-200 shadow-sm p-0.5 update-btn rounded-md border-opacity-0 hover:border-opacity-100">
                <button @click="renderNextPage"
                    class="py-2 px-3 rounded sm:text-sm text-xs bg-slate-600 text-white">Next</button>
            </div>
    </div>
    </aside>
  </section>
  <div class="grid place-items-center mt-3 pb-4">
   <span @click="endQuiz" class="p-0.5 rounded-md border-2 transition-all border-opacity-0 hover:border-opacity-100 border-white"><button class="px-5 py-3 text-white rounded-sm uppercase text-xs" style="background-color: #333E48;">done</button></span>
  </div>
</div>

<ResultModal v-if="endQuizSession" :result = "result" :resultData = "resultData"/>
</template>

<script>
import ResultModal from "../components/ResultModal.vue"
export default {
    components :{ResultModal},
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
            questions: [
                {
                    id : "1",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : '2',
                    question: "What is the capital of Lithuania?",
                    options: ["Riga", "Valdus", "Vilinuis", "Kaunas"],
                    answer: "Riga"
                },
                {
                    id : "3",
                    question: "What is the capital of Usa?",
                    options: ["Chicago", "Hawaii", "New York", "Washington Dc"],
                    answer: "New York"
                },
                {
                    id : "4",
                    question: "What is the capital of China?",
                    options: ["Tokyo", "Don't Know", "Asia", "Beijing"],
                    answer: "Beijing"
                },
                {
                    id : "5",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "6",
                    question: "What is the capital of Brazil?",
                    options: ["Jos", "America", "South America", "Rio"],
                    answer: "Rio"
                },
                {
                    id : "7",
                    question: "What is the capital of South Korea?",
                    options: ["Portugal", "Honduras", "I don't know", "North Korea"],
                    answer: "I don't know"
                },
                {
                    id : "8",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "9",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "10",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "11",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "12",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "13",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "14",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
                {
                    id : "15",
                    question: "What is the capital of Jordan?",
                    options: ["Amman", "Madaba", "Bishek", "Muscat"],
                    answer: "Bishek"
                },
            ]
        }
    },
    mounted(){
        this.tempQuestionArr = [...this.questions.slice(0,5)]
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
                let startIndex = parseInt(this.tempQuestionArr[0].id) - 6
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
                return !options.startsWith(id[0])
            }) 
            this.selectedOptions.push(id)
        },
        endQuiz(){
            let answers = []
            let questionId = []
            this.selectedOptions.map(option=>{
                let answer = option.substring(option.length - 1, option.length)
                answers.push(answer)
                option=option.replace(answer," ").trim()
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
        }
    }

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