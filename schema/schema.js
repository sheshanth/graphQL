const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql

const books = [
    { id: "1", name: "asd", genre: "aasdasdasdasdasda", authorId: "1" },
    { id: "2", name: "zxc", genre: "zxczxczxczxczxczx", authorId: "2" },
    { id: "3", name: "qwe", genre: "qweqweqweqweqweqw", authorId: "3" },
    { id: "4", name: "faq", genre: "aasdasdasdasdasda", authorId: "1" },
    { id: "5", name: "qaf", genre: "aasdasdasdasdasda", authorId: "1" },
    { id: "6", name: "afqq", genre: "aasdasdasdasdasda", authorId: "3" },
]

const authors = [
    { id: "1", name: "Chris", age: 25 },
    { id: "2", name: "Paffu", age: 23 },
    { id: "3", name: "Goutham", age: 22 },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})