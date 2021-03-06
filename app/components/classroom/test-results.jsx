import React from 'react';
import { Link , History } from 'react-router';
import AuthMixin from '../../services/authMixin.jsx';
import coursesData from '../../services/courses.jsx';
import userData from '../../services/user.jsx';
import TestData from '../../services/tests.jsx';
import TestCards from '../classroom/results-card.jsx';
import config from '../../services/config.jsx';

function fold(arr) {
	return arr[0];
}

export default React.createClass({
	displayName: 'TestResults',
	mixins: [AuthMixin,History],
	originalMembers: [],
	getInitialState(){
		document.body.className = '';
		return{
			members: []
		}
	},
	componentDidMount() {
		userData.getUser(config.getUserId()).then(res=>{
			if (!res.user.admin) {
				this.props.history.push('/');
			} 
			this.setState({
				user: res.user
			});
		});
		coursesData.getCourseById(this.props.params.courseId)
			.then(res => {
				const members = res.course.students
					.map(student => student._id)
					.map(userData.getUser);

				Promise.all(members)
					.then(student => {

						this.setState({
							members: student
						});
					});
		});
	},
	renderCards() {
		return (
			this.state.members.map((res) => {
				const courseId = this.props.params.courseId;
				const course = fold(
					res.user.courses.filter((course) => {
						return	course._id === courseId
					})
					.map(course => {
						course.tests = course.tests.map(test => {
							return { _id: test} 
						});
						return course;
					})
				);
				//Find the course we are currenty on, and only pass those tests to the testCard 
				return <TestCards studentInfo={res.user} course={course} key={`student-${res.user._id}`} isAdmin={this.state.user.admin} />
				
			})
		)
	},
	render() {
		return (
			<section className="dashWrap">
				{this.renderCards()}
			</section>
		)
	}
});
