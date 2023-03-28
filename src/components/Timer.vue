<template>
  <div class="w-1/6 flex justify-center">
    <div class="text-white border py-3 bg-gray-600 w-3/5 text-xl text-center">
      {{ minutes }} : {{ secondStr }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    testDone: Boolean,
    difficulty: String,
  },
  data() {
    return {
      minutes: 15,
      seconds: 59,
      timerInterval: "",
      secondStr: "00",
    };
  },
  methods: {
    startTimer() {
      if (this.difficulty === "easy") this.minutes = 20;
      this.timerInterval = setInterval(() => {
        this.seconds--;
        if (this.seconds % 10 === this.seconds) {
          this.secondStr = "0" + this.seconds;
        } else this.secondStr = this.seconds;
        if (this.seconds === 0 && this.minutes === 0)
          clearInterval(this.timerInterval);
        else if (this.seconds === 0) {
          this.seconds = 59;
          this.minutes--;
        }
      }, 100);
    },
  },
  beforeUpdate() {
    if (this.testDone == true || (this.minutes === 0 && this.seconds === 0)) {
      clearInterval(this.timerInterval);
    }
    if (this.seconds === 0 && this.minutes === 0) {
      clearInterval(this.timerInterval);
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
};
</script>
<style></style>
