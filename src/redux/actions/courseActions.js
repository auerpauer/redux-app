import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// ************************
// functions used by thunks
// ************************
function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

function updateCourseSuccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses };
}

function createCourseSuccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, courses };
}

// thunks
export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    // "getState" accesses the Redux store
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
