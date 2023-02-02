<template>
    <div class="w-14 h-14 relative bg-black m-auto grid place-items-center sizer rounded-full">
        <div class="bg-white grid loader place-items-center w-12 h-12 rounded-full">
            <div class="w-10 h-10 grid fixed place-items-center bg-transparent rounded-full"><LoadingImage /></div>
        </div>
    </div>
</template>
<script>
import LoadingImage from "./LoadingImage.vue"
export default {
    components : {LoadingImage}
}
</script>
<style>
.loader {
    animation: load 2s linear 0s infinite;
}
.sizer{
    animation: resize 1.5s linear 0s infinite;
}
@keyframes load {
        0%{
            transform: rotate(0deg);
        }
        25%{
            transform: rotate(90deg);
        }
        50%{
            transform: rotate(180deg);
        }
        100%{
            transform: rotate(360deg);
        }
}
@keyframes resize {
            0% {
                transform: scale(1);
            }
    
            25% {
                transform: scale(0.6);
            }
    
            90% {
                transform: scale(1);
            }
}
</style>