<template lang="">
  <div style="height: 60vh" class="relative flex justify-center">
    <div class="w-full banner-about-img flex flex-wrap h-full"> </div>
  </div>
  <div class="py-10 flex justify-center">
    <div class="w-9/12">
      <div class="">
        <div>
          <ul
            class="flex text-sm whitespace-nowrap sm:text-base"
            @click="navigate"
          >
            <li class="cursor-pointer dev ml-0 sm:mx-4 active">About Me</li>
            <li class="cursor-pointer serve mx-4 inactive p-about"
              >What I offer</li
            >
          </ul>
        </div>
      </div>
      <div class="justify-center items-center content flex py-10">
        <HeroContent v-for="(item, index) in content" :key="index">
          <template #header>
            <div>
              <h5 class="text-sm sm:text-2xl p-about">{{ item.header }}</h5>
            </div>
          </template>
          <template #btn-slot>
            <div class="flex pb-5 justify-center">
              <img :src="getImageUrl(item.src)" alt="Img" />
            </div>
            <div class="p-about" v-html="item.content"> </div>
          </template>
        </HeroContent>
      </div>
    </div>
  </div>
</template>
<script>
import HeroContent from "../components/HeroContent.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
import { useUniversalStore } from "../store/universal";
export default {
  components: { HeroContent },
  mixins: [getImageUrl],
  methods: {
    navigate(e) {
      const darkModeStatus = useUniversalStore().darkModeStatus;
      const currentActiveLink = document.querySelector(".active");
      if (currentActiveLink === e.target) return;
      else if (e.target.classList.contains("inactive")) {
        currentActiveLink.classList.remove("active");
        currentActiveLink.classList.add("inactive");
        currentActiveLink.classList.add("p-about");
        e.target.classList.remove("inactive");
        e.target.classList.remove("p-about");
        darkModeStatus ? (e.target.style.color = "#bbb") : "";
        e.target.classList.add("active");
      }

      this.content.pop();
      e.target.classList.contains("dev")
        ? this.content.push(this.devInfo)
        : this.content.push(this.services);
    },
  },
  data() {
    return {
      content: [],
      devInfo: {
        header:
          "We build, inform and empower Developers and Non-Developers also communities about tech and tech related issues.",
        src: "Work.jpg",
        content:
          "I use the power of development to enrich lives. We achieve this goal through showcasing compelling projects and to also build projects from small to large complex apps.",
      },
      services: {
        header:
          "We offer a ton of service ranging from web development to technical writing and also consultation on tech related issues.",
        src: "services.jpg",
        content:
          "Navigate to my Github profile to view more of the projects I've handled and feel free to contact me by using the button below after filling out your email and message. <a href='https://www.github.com/sam-c14/' style='color:blue; target='_blank' padding-block:0.1rem; border-bottom: 1px solid blue;'>My Github Profile</a>",
      },
    };
  },
  mounted() {
    this.content.push(this.devInfo);
    const store = useUniversalStore();
    if (store.darkModeStatus) {
      const aboutTags = [...document.getElementsByClassName("p-about")];
      console.log(aboutTags);
      aboutTags.map((tag) => {
        tag.style.color = "#bbb";
      });
    }
  },
};
</script>
<style>
.banner-about-img {
  background: url("../assets/images/about.jpg") no-repeat center/cover;
}
.active {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
  border-radius: 9999px;
  padding: 0.2rem 1.25rem;
  transition: all 0.5s;
}
.inactive {
  color: black;
  background: none;
  border-radius: 0;
  padding: 0.2rem 0;
  transition: all 0.5s;
}
.inactive:hover {
  color: rgb(60 130 246);
}
@media (max-width: 640px) {
  .banner-about-img {
    background: linear-gradient(#eeeeee3a, #aaaaaa41),
      url("../assets/images/about.jpg") no-repeat center/cover !important;
  }
}
</style>
