<template>
    <aside class="aside-img my-2 h-screen flex flex-wrap" ref="asideImgBackGround">
        <div class="w-full">
            <h1 class="text-center text-xl md:text-2xl lg:text-3xl text-white mt-5 sm:mt-10 font-semibold">Third party apps and Integrations used</h1>
        </div>
        <div class="h-full pt-10 lg:w-4/5">
            <div class="flex h-1/2 justify-center w-full">
                <div class="w-10/12 md:justify-center gap-5 justify-between lg:gap-8 lg:justify-end flex flex-wrap lg:flex-nowrap">
                    <div @mouseover="showText" :ref="'circle'" v-for="(logo,index) in imgLogo" :key="logo" :id="index" class="h-1/3 relative md:h-1/2 rounded-full w-2/5 md:w-1/5 img-circle">
                        <div>
                            <img :src="getImageUrl(logo)" class="w-full h-full rounded-full" alt="" srcset=""/>
                        </div>
                        <div class="mt-2 text absolute text-center text-xs text-white w-full">
                            <p>{{ asideContent[index].content }}</p>
                            <p class="mt-3 font-semibold"><a target="_blank" :href="asideContent[index].link">{{ asideContent[index].linkTitle }}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>
<script>
import getImageUrl from "../utilities/getImageUrl"
export default {
    mixins: [getImageUrl],
    data(){
        return{
            imgLogo: ["Api_logo.jpg", "Firebase_logo.jpg", "Tailwind_logo_2.jpg", "Vue_Js_Logo.jpg"],
            backgroundImgs : ["Api_Background.jpg","Firebase_Background_2.jpg","Tailwind_Background.jpg","Vue_Background.jpg"],
            currentTag:'',
            newTagArr : [],
            asideContent :[ 
                {
                    content : 'The Trivia api was used to fetch the questions for each quiz.Click the link below to check it out.',
                    link: "https://the-trivia-api.com/",
                    linkTitle : "Trivia api"
                },
                {
                    content: 'Firebase was used for auth operations.Click the link below to check the docs.',
                    link: "https://firebase.google.com/",
                    linkTitle: "Firebase"
                },
                {
                    content: 'Tailwind css was used for custom styles.Check out tailwind docs below.',
                    link: "https://tailwindcss.com/",
                    linkTitle: "Tailwind"
                },
                {
                    content: 'Vue Js was used as the frontend js framework.Know more about vue js by clicking link below.',
                    link: "https://vuejs.org/",
                    linkTitle: "Vue Js"
                },
        ]
        }
    },
    methods : {
        changeBackground(img){
            this.$refs.asideImgBackGround.style.opacity = '0.7'
            this.$refs.asideImgBackGround.style.background = `url(${this.getImageUrl(img)}) no-repeat center/cover`
            setTimeout(()=>{
                this.$refs.asideImgBackGround.style.opacity = '1'
            },300)
        },
        showText(e){
            if (!e) e = {currentTarget:this.$refs.circle[0]}
            this.currentTag = e.currentTarget
            if(!this.newTagArr.includes(this.currentTag)){
                this.$refs.circle.map(tag => {
                    if (tag !== e.currentTarget) {
                        tag.lastElementChild.style.opacity = '0'
                    }
                    else {
                        tag.lastElementChild.style.opacity = '100'
                        this.changeBackground(this.backgroundImgs[Number(tag.id)])
                        this.newTagArr.pop()
                        this.newTagArr.push(tag)
                        this.currentTag = tag
                    }
                })
            }
        }
    },
    mounted(){
        this.showText()
    }    
}
</script>
<style>
.aside-img{
   transition: all .4s;
}
@media (max-width : 640px) {
    .aside-img{
        height: 150vh !important;
    }
}
@media (min-width: 1024px) {
    .img-circle {
        width: 13.666667% !important;
    }
}
.text{
    transition: all .5s;
}
</style>
