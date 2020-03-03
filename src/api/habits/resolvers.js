import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import Habits from './habits';

export const habitsResolvers = {
	Query: {
		async habits() {
			try {
				const habits = await Habits.find();
				return habits;
			} catch (error) {
				console.log('error:', error);
			}
		},
	},

	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Custom Date Scalar',
		parseValue(value) {
			return new Date(value); // value from client
		},
		serialize(value) {
			return value.getTime(); // value sent to client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return new Date(ast.value);
			}
			return null;
		},
	}),
};
