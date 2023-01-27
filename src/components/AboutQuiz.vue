<template>
    <aside class="bg-gray-400 h-screen">
        <div class="h-full flex flex-wrap sm:flex-nowrap">
            <div class="w-full sm:mt-0 mt-1 sm:w-1/2 flex items-center pr-0 justify-center">
                <img class="w-3/5 lg:w-1/2 md:w-4/6 h-full sm:h-1/2 rounded-full"
                    :src="getImageUrl(quizImages[asideImgCount])" alt="">
            </div>
            <div class="w-full px-2 sm:px-0 sm:w-1/2 flex items-center">
                <div class="text-white">
                    <h1 class="text-lg lg:text-3xl lg:px-0 md:px-2 font-semibold ">Know More About Your Quiz</h1>
                    <p class="my-2 sm:my-3 md:px-2 lg:mx-0 text-xs sm:text-sm">Through MultiChoice Africa, millions of households in sub-Saharan
                        Africa have access to the best entertainment. We do
                        this through cutting-edge technology on our DStv and GOtv platforms.</p>
                    <Btn icon="btn" direction="right-long">More Info</Btn>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import getImageUrl from "../utilities/getImageUrl"
import Btn from "../components/Btn.vue"
export default {
    components: { Btn },
    mixins: [getImageUrl],
    props : {
        quizImages: Array,
        asideImgCount : Number
    }
    
}
</script>