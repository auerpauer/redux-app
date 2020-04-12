import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorActions";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        // "catch" errors from the "promise"
        alert("Loading Courses Failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        // "catch" errors from the "promise"
        alert("Loading Authors Failed " + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

// specify what sh/d be passed in; "dispatch" is passed in by connect as a default for "mapDispathToProps"
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

// determine props recv'd by child components
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  }; // request only the data you component needs to reduce needless refreshes
}

// "mapDispatchToPage" as an object
// const mapDispatchToProps = {
//   createCourse: actions.createCourse
// };

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// "mapDispatchToProps" defaults to a dispatch property...whatever that means
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); // "connect()" returns a function, which takes "CoursesPage" as it's argument
