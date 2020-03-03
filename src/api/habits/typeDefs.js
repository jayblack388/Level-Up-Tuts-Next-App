import gql from 'graphql-tag';

export const habitsTypeDefs = gql`
	type Habit {
		_id: ID!
		name: String!
		events: [Event]
	}

	type Event {
		_id: ID!
		date: Date
	}

	input HabitInput {
		_id: ID
		name: String!
	}

	type Mutation {
		addHabit(habit: HabitInput): Habit
		addEvent(habitId: ID, date: Date): Habit
		removeEvent(habitId: ID, eventId: ID): Habit
	}

	type Query {
		habits: [Habit]
	}

	scalar Date
`;
