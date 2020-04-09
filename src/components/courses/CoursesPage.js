import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

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
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
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
  actions: PropTypes.object.isRequired
};

// determine props recv'd by child components
function mapStateToProps(state) {
  return { courses: state.courses }; // request only the data you component needs to reduce needless refreshes
}

// "mapDispatchToPage" as an object
// const mapDispatchToProps = {
//   createCourse: actions.createCourse
// };

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// "mapDispatchToProps" defaults to a dispatch property...whatever that means
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // "connect()" returns a function, which takes "CoursesPage" as it's argument
