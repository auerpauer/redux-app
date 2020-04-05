import { combineReducers } from "redux";
import courses from "./courseReducer";

const RootReducer = combineReducers({
  courses
});

export default RootReducer;
