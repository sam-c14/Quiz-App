<template>
  <div class="w-full h-full" style="background: #222">
    <div class="py-10">
      <div class="text-center text-white">
        <h1 class="font-bold">
          <span v-if="score >= Math.floor(resultArr.length / 2)">Yayy</span>
          <span v-else>Awwn</span>
          you
          <span v-if="score >= Math.floor(resultArr.length / 2)">passed</span>
          <span v-else>didn't do too well on </span>
          the quiz
          <span v-if="score < Math.floor(resultArr.length / 2)"
            >better luck next time</span
          >
        </h1>
        <h2 class="font-bold">Your score was {{ score }}</h2>
      </div>
      <div
        class="flex justify-center flex-wrap mt-5 lg:px-2 md:gap-4 md:px-0 px-2 gap-1 lg:gap-1"
      >
        <div
          v-for="object in resultArr"
          :key="object"
          class="font-thin w-full md:w-2/5 lg:w-1/3 text-sm text-white"
        >
          <table class="border text-inherit w-full h-full border-gray-100">
            <thead>
              <tr>
                <td
                  class="pl-2 border-b-2 border-blue-100 border-opacity-20 py-3"
                  >Question :</td
                >
                <td
                  class="pl-2 border-b-2 border-blue-100 border-opacity-20 py-3"
                  >{{ object.question }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="pl-2 border-b-2 border-blue-100 border-opacity-20 py-3"
                  >Your Answer :</td
                >
                <td
                  class="pl-2 border-b-2 border-blue-100 border-opacity-20 py-3"
                  :class="
                    object.selectedOption == object.answer
                      ? 'text-green-600'
                      : 'text-red-500'
                  "
                  >{{ object.selectedOption }}</td
                >
              </tr>
              <tr>
                <td class="pl-2 py-3">Correct Answer :</td>
                <td class="text-green-600 pl-2 py-3">{{ object.answer }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: JSON.parse(this.$route.params.score),
      resultArr: JSON.parse(this.$route.params.resultArr),
    };
  },
  mounted() {
    console.log(this.resultArr);
  },
};
</script>

<style>
.ls {
  background: rgba(22, 3, 4, 0.623);
}
</style>
