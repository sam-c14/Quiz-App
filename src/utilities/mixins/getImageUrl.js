export default {
  methods: {
    getImageUrl(imageUrl, path = 0) {
      // This path must be correct for your file
      return path == 0
        ? new URL(`../../assets/images/${imageUrl}`, import.meta.url)
        : new URL(`../assets/images/${imageUrl}`, import.meta.url);
    },
  },
};
