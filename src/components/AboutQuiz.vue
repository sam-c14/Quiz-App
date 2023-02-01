<template>
<aside class="bg-gray-400 py-5 sm:h-screen">
    <div class="h-full flex flex-wrap sm:flex-nowrap">
        <div class="w-full sm:mt-0 mt-1 sm:w-1/2 h-full flex items-center pr-0 justify-center">
            <img class="w-3/5 rounded-3xl lg:w-10/12 xl:w-10/12 md:w-3/4 h-full sm:h-2/3 md:rounded-md lg:rounded-full"
                :src="getImageUrl(quizImages[asideImgCount])" alt="">
        </div>
        <div class="w-full px-2 sm:px-0 sm:w-1/2 flex items-center">
            <div class="text-white">
                <h1 class="text-lg lg:text-3xl text-center sm:text-justify lg:px-0 md:px-2 font-semibold my-1 py-2 md:py-0">Know More About Your Quiz
                </h1>
                <p class="my-2 sm:my-3 lg:px-0 md:px-2 text-center sm:text-justify lg:mx-0 text-xs md:pt-2 pt-0 lg:text-sm">Through MultiChoice Africa,
                    millions of households in sub-Saharan
                    Africa have access to the best entertainment. We do
                    this through cutting-edge technology on our DStv and GOtv platforms.</p>
                <div class="flex px-0 sm:block justify-center">
                    <Btn icon="btn" direction="right-long">More Info</Btn>
                </div>
            </div>
        </div>
    </div>
</aside>
</template>
<script>
import getImageUrl from "../utilities/mixins/getImageUrl"
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