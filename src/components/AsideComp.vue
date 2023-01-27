<template>
    <aside class="aside-img my-2 h-screen flex flex-wrap">
        <div class="w-full">
            <h1 class="text-center text-xl md:text-2xl lg:text-3xl text-white mt-5 sm:mt-10 font-semibold">Third party apps and Integrations used</h1>
        </div>
        <div class="h-full pt-10">
            <div class="flex h-1/2 justify-center w-full">
                <div class="w-10/12 md:justify-center gap-5 justify-between lg:gap-8 md:gap-y-5 md:gap-x-10 lg:justify-between  flex flex-wrap lg:flex-nowrap">
                    <div v-for="num in 6" :key="num" class="h-1/3 md:h-1/2 rounded-full w-2/5 md:w-1/5 lg:w-1/6">
                        <img src="../assets/images/Art_Quiz.jpg" class="w-full h-full rounded-full" alt="" srcset="">
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
export default {
    
}
</script>
<style>
@media (max-width : 640px) {
    .aside-img{
        height: 150vh !important;
    }
}
</style>