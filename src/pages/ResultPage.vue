<template>
 <div class="w-full h-full bg-blue-300">
  <div class="grid place-items-center">
    <div class="text-center">
      <h1 class="font-bold text-white">
        <span v-if="score >= Math.floor(resultArr.length / 2)">Yayy</span>
        <span v-else>Awwn</span> 
        you 
        <span v-if="score >= Math.floor(resultArr.length / 2)">passed</span> 
        <span v-else>didn't do too well on </span>
        the quiz
        <span v-if="score < Math.floor(resultArr.length / 2)">better luck next time</span>
       </h1>
      <h2 class="font-bold text-white">Your score was {{ score }}</h2>
    </div>
    <div class="flex flex-wrap justify-center px-2">
      <div v-for="object in resultArr" :key="object" class="flex w-1/4 justify-center flex-col  font-semibold text-white">
        <div>{{ object.question }}</div>
        <div :class="object.selectedOption == object.answer ? 'text-green-600' :'text-red-500'">Your Answer : {{
        object.selectedOption }}</div>
        <div class="text-green-600">Correct Answer : {{ object.answer }}</div>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  mounted(){
    // console.log(JSON.parse(this.$route.params.resultArr))
  },
  data(){
  return {
    score: this.$route.params.score,
    resultArr: JSON.parse(this.$route.params.resultArr),
    }
  },
  methods : {
    renderResultAnalysis(){

    }
  },
  mounted(){
  }

}
</script>

<style>
.ls{
  background: rgba(22, 3, 4, 0.623);
}
</style>