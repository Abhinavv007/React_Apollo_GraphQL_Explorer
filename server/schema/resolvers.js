import UserList from "../database/db.js"
import { MovieList } from "../database/db.js"
import _ from "lodash"
const resolvers = {
  Query: {
    users: () => {
      return UserList
    },
    user: (parent, args) => {
      const id = args.id
      const user = _.find(UserList, { id })
      return user
    },
    movies: () => {
      return MovieList
    },
    movie: (parent, args) => {
      const name = args.name
      const user = _.find(MovieList, { name })
      return user
    }


  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.year > 1994)
    }
  },

  Mutation: {
    createUser: (parent, args) => {
      let user = args.input
      console.log(user)
      let lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user)
      return user

    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input
      let updatedUser;
      UserList.forEach((user) => {
        if (user.id === id) {
          user.username = newUsername
          updatedUser = user

        }
      })
      return updatedUser

    },
    deleteUser: (parent, args) => {
      const id = args.id
      _.remove(UserList, (user) => user.id === id)
      return null

    }
  }
}
export default resolvers