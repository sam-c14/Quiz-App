<template>
    <div class="w-full h-full bg-black bg-opacity-40 z-50 fixed top-0">
        <div class="grid w-full h-full place-items-center">
            <div class="bg-white rounded-sm z-40 p-7">
                <slot name="header"></slot>
                <slot name="main"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    mounted() {
        
    }
}
</script>

<style>
.happy-text {
    animation: resize_color_change 1.9s infinite;

}

@keyframes resize_color_change {
    0% {
        transform: scale(0.9);
        background-color: #1d6cd4;
    }

    50% {
        transform: scale(1.1);
        background-color: #1d6cd4;
    }

    100% {
        transform: scale(0.9);
        background-color: #381dd4;
    }
}
</style>