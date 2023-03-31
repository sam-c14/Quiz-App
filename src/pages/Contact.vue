<template>
  <div style="height: 60vh" class="relative flex justify-center">
    <div class="w-full banner-contact-img flex flex-wrap h-full"> </div>
  </div>
  <div class="flex justify-center mt-5">
    <form
      class="w-9/ justify-center py-2 gap-2 flex-wrap flex"
      @submit="submitForm"
    >
      <div class="w-4/5 sm:w-3/5 flex flex-wrap justify-center">
        <label for="email">Email:</label>
        <input
          id="email"
          class="border w-full py-2 my-2 pl-1"
          type="email"
          placeholder="Enter your email"
          autocomplete="off"
        />
      </div>
      <div class="w-4/5 sm:w-3/5 flex flex-wrap justify-center">
        <label for="message">Message:</label>
        <textarea
          name=""
          id="message"
          class="w-full border my-2 pt-1 pl-1"
          placeholder="Leave a message"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <input
        type="button"
        value="Send Message"
        class="py-2 px-5 bg-blue-500 text-white rounded-sm cursor-pointer hover:bg-blue-900 transition-all w-3/5"
      />
    </form>
  </div>
</template>
<script>
import { useUniversalStore } from "../store/universal";
export default {
  mounted() {
    const store = useUniversalStore();
    if (store.darkModeStatus) {
      const labels = document.getElementsByTagName("label");
      labels.map((label) => {
        label.style.color = "#bbb";
      });
    }
  },
};
</script>
<style>
.banner-contact-img {
  background: url("../assets/images/contact-us-2.svg") no-repeat center/cover;
}
</style>
