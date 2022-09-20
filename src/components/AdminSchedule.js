import { Axios } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

import "./schedule.css";

// Requires to install a new package called "html-react-parser"
const parse = require("html-react-parser");

// map to select color for each interval dynamically
const colorForInterval = new Map([
  ["10:15-11:05", "bg-tomato"],
  ["11:05-11:55", "bg-sky"],
  ["11:55-12:45", "bg-green"],
  ["12:45-13:35", "bg-orange"],
  ["13:35-14:05", "bg-yellow"],
  ["14:05-14:55", "bg-pink"],
  ["14:55-15:45", "bg-purple"],
  ["15:45-16:35", "bg-lightred"],
]);

// isObjectEmpty checks if an object is empty or not
// Useful when getting response from api
function isObjectEmpty(obj) {
  return JSON.stringify(obj) === "{}";
}

const Schedule = () => {
  const { http, role, user_id, token, https } = AuthUser();

  // Here, it should be object because backend sends ab object inside which there are arrays
  const [dat, setData] = useState(Object);

  useEffect(() => {
    //  fetchDetail();
    fetchAsync();
  }, []);
  // Using async, learned somewhere on stackoverflow
  const fetchAsync = async () => {
    if (role === "student") {
      const response = await https.get(`/students/${user_id}/schedule`);
      setData(response.data);
      console.log("student schdule = ");
      console.log(response.data);
    }
    // for teacher
    else if (role === "teacher") {
      const response = await https.get(`/teachers/${user_id}/schedule`);
      setData(response.data);
      console.log("teacher data = ");
      console.log(response.data);
    }
  };

  function renderElement() {
    if (isObjectEmpty(dat)) {
      return <p>Loading.....</p>;
    } else {
      console.log("data loaded");
      console.log(dat);

      // Create map and separate each days on the basis on name
      const days = new Map();
      days.set("SUNDAY", dat.days[0]);
      days.set("MONDAY", dat.days[1]);
      days.set("TUESDAY", dat.days[2]);
      days.set("WEDNESDAY", dat.days[3]);
      days.set("THURSDAY", dat.days[4]);
      days.set("FRIDAY", dat.days[5]);
      days.set("SATURDAY", dat.days[6]);

      if (role === "student") return parse(generateScheduleForStudent(days));
      else if (role === "teacher")
        return parse(generateScheduleForTeacher(days));
    }
  }

  return (
    <div>
      <h1 className="mb-4 mt-4">Schedule</h1>
      {renderElement()}
    </div>
  );
};

export default Schedule;
