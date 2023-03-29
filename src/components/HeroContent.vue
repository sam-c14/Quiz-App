<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <aside>
      <slot name="btn-slot"></slot>
    </aside>
  </div>
</template>
<script>
import { useUniversalStore } from "../store/universal";
export default {
  mounted() {
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
