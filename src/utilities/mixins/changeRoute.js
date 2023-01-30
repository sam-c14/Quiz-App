export default {
  methods: {
    changeRoute(name, params) {
      console.log(params);
      this.$router.push({ name, params });
    },
  },
};
//   renderQuiz(index){
//             console.log(index);
//             this.$router.push({
//                 name: 'quiz',
//                 params: {
//                     category: this.categories[index],
//                 }
//             });
//         }
