<template>
  <footer>
    <div class="bg-black py-3 pb-1">
      <div>
        <div class="w-full my-2 h-full flex flex-wrap sm:flex-nowrap">
          <div class="w-full sm:w-1/2 h-full sm:my-0 my-2 text-center">
            <div class="flex gap-x-1 justify-center items-center">
              <p class="font-bold text-white md:text-xl lg:text-2xl"
                >QuizGame</p
              >
              <LoadingImage class="w-6 h-6 mt-1 text-white" />
            </div>
          </div>
          <div class="w-full sm:block flex justify-center xl:w-2/5 sm:w-1/2">
            <div class="w-1/2 h-full justify-end flex gap-3">
              <div
                v-for="(img, index) in footerImgLinks"
                :key="img"
                class="bg-white py-2 px-2 md:w-1/4 text-center h-full xl:w-1/6 link-container rounded-full lg:w-1/5"
              >
                <a target="_blank" :href="footerLinks[index]"
                  ><img
                    class="w-full h-full rounded-full"
                    :src="getImageUrl(footerImgLinks[index])"
                    alt=""
                /></a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex my-2 justify-center">
          <ul class="flex justify-center px-2 gap-3 flex-wrap sm:gap-5">
            <li
              class="text-white text-xs hover:text-blue-500 quiz-card capitalize"
              v-for="link in footerDetails"
              :key="link"
              ><a
                v-if="link.link !== '/contact'"
                target="_blank"
                :href="link.link"
                >{{ link.content }}</a
              >
              <router-link v-else :to="link.link">{{
                link.content
              }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import Btn from "../components/Btn.vue";
import getImageUrl from "../utilities/mixins/getImageUrl";
import LoadingImage from "../assets/icons/LoadingImage.vue";
export default {
  components: { Btn, LoadingImage },
  mixins: [getImageUrl],
  data() {
    return {
      footerImgLinks: ["Twitter_Logo.jpg", "Githublogo.jpg", "Link_Logo.jpg"],
      footerLinks: [
        "http://twitter.com/affah_samuel",
        "https://github.com/sam-c14/",
        "https://www.linkedin.com",
      ],
      footerDetails: [
        { content: "About Us", link: "https://github.com/sam-c14/" },
        { content: "Know more Vue", link: "https://vuejs.org/" },
        {
          content: "Pexels",
          link: "https://www.pexels.com",
        },
        { content: "Tailwind icons", link: "https://heroicons.com/" },
        { content: "Contact Us", link: "/contact" },
      ],
    };
  },
};
</script>
<style>
@media (min-width: 1280px) {
  .link-container {
    width: 12.667%;
  }
}
</style>
