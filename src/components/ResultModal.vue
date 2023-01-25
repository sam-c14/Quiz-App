<template>
  <div class="w-full h-full bg-black bg-opacity-40 fixed top-0">
    <div class="grid w-full h-full place-items-center">
        <div class="bg-white rounded-sm z-40 p-7">
            <h1 class="m-1">Yayy You Completed the quiz!!!</h1>
            <p class="m-1">Lorem ipsum dolor sit amet.</p>
            <div class=" text-center my-4 flex justify-center">
                <div class="border happy-text text-white text-sm bg-blue-500  rounded-full p-2 w-1/3 py-7">
                    Yayy
                </div>
            </div>
            <button @click="routeResult"
                class="w-full my-2 hover:bg-blue-800 transition-all bg-blue-900 px-3 text-gray-200 rounded-md py-2 font-semibold text-xs uppercase tracking-wider cursor-pointer">Click Here to see the results</button>
            </div>
    </div>
  </div>
</template>

<script>
export default {
    props : {result : Number,resultData:Array},
    data(){
        return {
            clicked : true,
        }
    },
    methods:{
        routeResult(){
            this.$router.push({
                name: 'result',
                params: {
                    score : this.result,
                    resultArr: JSON.stringify(this.resultData)
                }
            });
        }
    }

}
</script>

<style>
.happy-text{
    animation: resize_color_change 1.9s infinite;

}
@keyframes resize_color_change {
    0%{
        transform : scale(0.9);
        background-color: #1d6cd4;
    }
    50%{
        transform : scale(1.1);
        background-color: #1d6cd4;
    }
    100%{
        transform : scale(0.9);
        background-color: #381dd4;
    }
}
</style>