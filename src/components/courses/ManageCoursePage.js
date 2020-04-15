import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        // "catch" errors from the "promise"
        alert("Loading Courses Failed " + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        // "catch" errors from the "promise"
        alert("Loading Authors Failed " + error);
      });
    }
  }, []); // empty array of objects to check means "only run once", like ComponentDidMount()

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses"); //doesn't carry state to next component
    });
  }

  return (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

// specify what sh/d be passed in; "dispatch" is passed in by connect as a default for "mapDispathToProps"
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// determine props recv'd by child components
function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  }; // request only the data you component needs to reduce needless refreshes
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

// "mapDispatchToProps" defaults to a dispatch property...whatever that means
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage); // "connect()" returns a function, which takes "ManageCoursePage" as it's argument
