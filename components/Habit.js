import HabbitButton from './HabitButton';

const getLast7Days = () => {
	const dates = '0123456'.split('').map(day => {
		const tempDate = new Date();
		tempDate.setDate(tempDate.getDate() - day);
		return tempDate;
	});
	return dates.reverse();
};

const colors = ['#718096', '#f56565', '#f6e05e', '#68d391', '#63b3Ed'];

const Habit = ({ habit, index }) => {
	const dates = getLast7Days();
	return (
		<article>
			<h3 style={{ borderColor: colors[index] }} className='habit-title'>
				{habit.name}
			</h3>
			<div className='buttons'>
				{dates.map(date => {
					return (
						<HabbitButton
							date={date}
							events={habit.events}
							habitId={habit._id}
							key={date.getTime()}
						/>
					);
				})}
			</div>
			<style jsx>{`
				article {
					padding: 20px;
					border-radius: 15px;
					box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
				}

				h3 {
					margin-top: 0;
					border-bottom: solid 4px ${colors[index]};
				}
				.buttons {
					display: flex;
				}
			`}</style>
		</article>
	);
};

export default Habit;
