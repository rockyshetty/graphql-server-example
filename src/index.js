import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.js";
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games: () => db.games,
    reviews: () => db.reviews,
    authors: () => db.authors,
    review: (_, { id }) =>
      db.reviews.find((eachReview) => eachReview.id === id),
    game: (_, { id }) => db.games.find((eachGame) => eachGame.id === id),
    author: (_, { id }) =>
      db.authors.find((eachAuthor) => eachAuthor.id === id),
  },
  Game: {
    reviews: ({ id }) =>
      db.reviews.filter((eachReview) => eachReview.game_id === id),
  },
  Author: {
    reviews: ({ id }) =>
      db.reviews.filter((eachReview) => eachReview.author_id === id),
  },
  Review: {
    author: ({ author_id }) =>
      db.authors.filter((eachAuthor) => eachAuthor.id === author_id),
    game: ({ game_id }) =>
      db.games.filter((eachGame) => eachGame.id === game_id),
  },
  Mutation: {
    deleteGame: (_, args) =>
      db.games.filter((eachGame) => eachGame.id !== args.id),
    addGame: (_, args) => {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame: (_, args) => {
      db.games = db.games.map((eachGame) => {
        if (eachGame.id === args.id) {
          return { ...eachGame, ...args.edits };
        }
        return eachGame;
      });
      return db.games.find((eachGame) => eachGame.id === args.id)
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);


//check video for appolo server queries https://youtu.be/5199E50O7SI?si=3rGVwXaQAuZsgrQf