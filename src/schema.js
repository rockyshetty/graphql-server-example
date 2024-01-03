export const typeDefs = `#graphql
 type Game {
    id: ID!,
    title: String!,
    platform: [String]!
    reviews: [Review!]
 }
 type Review {
   id: ID!,
   rating: Int!,
   content: String!
   author: Author!
   reviews: Review
   game: Game!
 }
 type Author {
   id: ID!
   name: String!
   verified: Boolean!
   reviews: [Review!]
 }
 type Query {
   reviews: [Review]
   games: [Game]
   authors: [Author]
   author(id: ID!): Author
   review(id: ID!): Review
   game(id: ID!): Game
 }
 type Mutation {
  deleteGame(id: ID!): [Game]
  addGame(game: AddGameInput!): Game
  updateGame(id: ID!, edits: EditGameInput): Game
 }
 input AddGameInput {
  title: String!
  platform: [String!]!
 }
 input EditGameInput {
  title: String
  platform: [String!]
 }
`;
