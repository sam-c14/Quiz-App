<template>
    <footer>
        <div class="bg-black py-3 pb-1">
            <div>
                <div class="w-full my-2 h-full flex ">
                    <div class="w-1/2 h-full"></div>
                    <div class="w-1/2">
                        <div class="w-1/2 h-full flex gap-3">
                            <div v-for="num in 3" :key="num"
                                class="bg-white py-2 px-2 text-center w-1/6 h-full rounded-full">
                                <Btn :icon="'left'"></Btn>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex my-2 justify-center">
                    <ul class="flex gap-5">
                        <li class="text-white text-sm hover:text-blue-500 quiz-card capitalize " v-for="num in 5"
                            :key="num">lorem</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import Btn from "../components/Btn.vue"
export default {
    components: { Btn },
}
</script>