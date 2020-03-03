import { ApolloServer } from 'apollo-server-micro';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
import { connectDB } from '../../lib';
import {
	habitsMutations,
	habitsResolvers,
	habitsTypeDefs,
} from '../../src/api/habits';

const resolvers = mergeResolvers([habitsResolvers, habitsMutations]);

const typeDefs = mergeTypeDefs([habitsTypeDefs]);

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const server = apolloServer.createHandler({ path: '/api/graphql' });

export default connectDB(server);

// // Short Way
// export default (req, res) => {
//   res.status(200).json({ test: "Hello World" });
// };

// // Long Way
// /* export default (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.statusCode = 200
//   res.end(JSON.stringify({
//     test: 'Hello World'
//   }))
// } */
