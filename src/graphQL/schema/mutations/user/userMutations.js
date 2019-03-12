exports.userMutations = `
  createUser(userInput: UserInput): User
  handleBoughtCourse(courseId: String!, amountPaid: Float!): User
  handlePayout(receiver: String!, amount: Float!): User
  uploadProfileImage(image: String!): User
`;