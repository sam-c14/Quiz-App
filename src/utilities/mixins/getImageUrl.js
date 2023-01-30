export default {
  methods: {
    getImageUrl(imageUrl) {
      // This path must be correct for your file
      return new URL(`../../assets/images/${imageUrl}`, import.meta.url);
    },
  },
};
