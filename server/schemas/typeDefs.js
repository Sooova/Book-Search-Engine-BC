const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    bookCount: Int
    savedBooks: [Book]
  }

type Book {
    _id: ID!
    bookId: String
    authors: [String]
    # authors: String
    description: String
    title: String
    image: String
    link: String
}

  type Auth {
    token: ID
    user: User
  }

  input savedBook {
      description: String
      title: String
      bookId: String
      Image: String
      link: String
      authors: [String]
  }

  type Query {
    me: User,
  }

  type Mutation {
    removeBook(id: ID!): User
    saveBook(input: savedBook!): User
    addUser(username: String! email: String! password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
