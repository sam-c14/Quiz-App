<template>
    <div class="w-1/6 flex justify-center ">
        <div class="text-white border  py-3  bg-gray-600 w-3/5 text-xl text-center">
            {{minutes}} : {{secondStr}}
        </div>
    </div>
</template>
<script>
export default {
    props : {
        testDone : Boolean
    },
    data(){
        return{
            minutes : 15,
            seconds : 59,
            timerInterval : '',
            secondStr : '00'
        }
    },
    methods:{
        startTimer(){
            this.timerInterval=setInterval(()=>{
                this.seconds--
                if (this.seconds % 10 === this.seconds) {
                    this.secondStr = "0" + this.seconds
                }
                else this.secondStr = this.seconds
                if(this.seconds === 0){
                    this.seconds = 59
                    // this.secondStr = "0" + this.seconds
                    this.minutes-- 
                }
            },100)
        }
    },
    beforeUpdate(){
        if(this.testDone == true || (this.seconds === 0 && this.minutes === 0)){
            clearInterval(this.timerInterval)
        }
    },
    mounted(){
        this.startTimer()
    }
}
</script>
<style>
    
</style>