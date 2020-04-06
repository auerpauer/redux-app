import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ""
    }
  };

  // Arrow functions inherit the binding context of their enclosing scope.
  // This is b/c arrow functions do not have a "this" object bound inside them.
  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault;
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />

        {this.props.courses.map(course => (
          <div key={course.title}> {course.title} </div>
        ))}
      </form>
    );
  }
}

// specify what sh/d be passed in; "dispatch" is passed in by connect as a default for "mapDispathToProps"
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

// determine props recv'd by child components
function mapStateToProps(state) {
  return { courses: state.courses }; // request only the data you component needs to reduce needless refreshes
}

// "mapDispatchToProps" defaults to a dispatch property...whatever that means
export default connect(mapStateToProps)(CoursesPage); // "connect()" returns a function, which takes "CoursesPage" as it's argument
