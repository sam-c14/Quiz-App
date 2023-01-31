import axios from "axios";

export default (category, difficulty, callback) => {
  axios
    .get(
      `https://the-trivia-api.com/api/questions?limit=15&categories=${category}&difficulty=${difficulty}`
    )
    .then((questions) => {
      console.log(questions.data);
      let newQuestions = questions.data.map((poster, index) => {
        return {
          options: [...poster.incorrectAnswers, poster.correctAnswer],
          answer: poster.correctAnswer,
          id: `${index + 1}`,
          question: poster.question,
        };
      });
      callback(null, newQuestions);
    })
    .catch((error) => callback(error, null));
};
