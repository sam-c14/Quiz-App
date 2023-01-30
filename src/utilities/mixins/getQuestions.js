export default (category, difficulty, callback) => {
  console.log(category);
  fetch(
    `https://the-trivia-api.com/api/questions?limit=15&categories=${category}&difficulty=${difficulty}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((data) => data.json())
    .then((questions) => {
      console.log(questions);
      let newQuestions = questions.map((poster, index) => {
        return {
          options: [...poster.incorrectAnswers, poster.correctAnswer],
          answer: poster.correctAnswer,
          id: `${index + 1}`,
          question: poster.question,
        };
      });
      callback(null, newQuestions);
    })
    .catch((error) => {
      callback(error, null);
    });
};
