const { ApolloServer, gql } = require('apollo-server-lambda')
require("dotenv").config()

const faunadb = require("faunadb")
const q = faunadb.query;

var client = new faunadb.Client({
  secret: process.env.FAUNA
})


const typeDefs = gql`
type Query {
    bookmark: [Bookmark!]
  }

  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
  type Mutation {
    addBookmark(url: String!, desc: String!): Bookmark
  }
  
  `

const authors = [
  { id: 1, url: 'https://github.com/gatsbyjs/gatsby-starter-hello-world', desc: "This is Gatsby Hello World GitHub offical repo" },
  { id: 2, url: 'https://github.com/gatsbyjs/gatsby-starter-hello-world', desc: "This is Gatsby Hello World GitHub offical repo" },
  { id: 3, url: 'https://github.com/gatsbyjs/gatsby-starter-hello-world', desc: "This is Gatsby Hello World GitHub offical repo" },
]

const resolvers = {
  Query: {
    bookmark: async (root, args, context) => {

      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("url"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)
        return result.data.map(d => {
          return {
            id: d.ts,
            url: d.data.url,
            desc: d.data.desc,
          }
        })

      } catch (err) {
        console.log("error: ", err)
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { url, desc }) => {
      console.log("url: ", url)
      console.log("desc: ", desc)

      try {
        const result = await client.query(
          q.Create(q.Collection("bookmark"), {
            data: {
              url,
              desc
            }
          })
        )
        console.log(result)

      } catch (err) {
        console.log(err)

      }



    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
