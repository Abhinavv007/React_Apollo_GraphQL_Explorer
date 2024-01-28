import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
    friends: [User]
    favoriteMovies:[Movie]
  }

  type Movie{
    id: ID!
    name:String!
    year:Int!
    isInTheaters:Boolean!

  }
 
  type Query {
    users: [User!]!
    user(id:ID!): User!

    movies:[Movie!]!
    movie(name:String!):Movie!
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA
  }
  input updateUsernameInput{
  id:ID!
  newUsername:String!
  }

  type Mutation {
  createUser(input:CreateUserInput!):User
  updateUsername(input:updateUsernameInput!):User
  deleteUser(id:ID!):User
}


  enum Nationality {
    INDIA
    CANADA
    GERMANY
    RUSSIA
  }
`

export default typeDefs;
