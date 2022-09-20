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

// Here, we generate each rows separately for each day
// Dynamically generates each row
// Later, parse with the html-react-parser package
function generateRowForDay(obj, colors) {
  // Day
  let row = `<td style="background-color:rgb(243, 238, 238);" class="td-fixed align-middle">`;
  row += obj.day;
  row += `</td>`;
  let temp = "";

  // Each subject
  if (obj.intervals != null) {
    obj.intervals.forEach((element) => {
      temp += `<td class="">`;
      temp +=
        `<span class = "padding-5 ` +
        colors.get(element.interval) +
        `">` +
        element.course_title +
        `</span>`;

      temp +=
        `<div className="margin-10px-top font-size14">` +
        element.interval +
        `</div>`;
      temp +=
        `<div className="font-size14 text-blue">` +
        element.teacher_name +
        `</div>`;
      temp += `</td>`;
    });
  }
  row += temp;
  return row;
}

// Rows for teacher
function generateTeacherRowForDay(obj, colors) {
  // Day
  let row = `<td style="background-color:rgb(243, 238, 238);" class="td-fixed align-middle">`;
  row += obj.day;
  row += `</td>`;
  let temp = "";

  // Each subject
  if (obj.intervals != null) {
    obj.intervals.forEach((element) => {
      temp += `<td class="">`;
      temp +=
        `<span class = "padding-5 ` +
        colors.get(element.interval) +
        `">` +
        element.course_title +
        `</span>`;

      temp +=
        `<div className="margin-10px-top font-size14">` +
        element.interval +
        `</div>`;
      temp += `</td>`;
    });
  }
  row += temp;
  return row;
}

const Schedule = () => {
  const { http, role, user_id, token, https } = AuthUser();

  // Here, it should be object because backend sends ab object inside which there are arrays
  const [dat, setData] = useState(Object);

  useEffect(() => {
    //  fetchDetail();
    fetchAsync();
  }, []);

  // old fetch code

  /*
    const fetchDetail = () => {
   Just fetch directly through user_id after logged in
    https.get(`/${role}s/${user_id}/schedule`).then((res) => {
  // http.get(`/schedules?program_id=1&semester_id=6`).then((res) => {
   setData(res.data);
   console.log("Response");
   console.log(res.data);
   console.log("Set data");
   console.log(dat);
  });
  };
*/

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

  // Generate schedule for student
  function generateScheduleForStudent(days) {
    let htmlData = `
 <div>
          <div className="container">
            <div className="timetable-img text-center">
              <img src="img/content/timetable.png" alt="" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr className="bg-light-gray">
                    <th className="text-uppercase">DAY</th>
                    <th className="text-uppercase" colspan="9">
                      Subjects
                    </th>
                  </tr>
                </thead>
                <tbody>
                  

                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("SUNDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("MONDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("TUESDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("WEDNESDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("THURSDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateRowForDay(days.get("FRIDAY"), colorForInterval);
    htmlData += `
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`;

    return htmlData;
  }

  // Generate schedule for teacher
  function generateScheduleForTeacher(days) {
    let htmlData = `
 <div>
          <div className="container">
            <div className="timetable-img text-center">
              <img src="img/content/timetable.png" alt="" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead>
                  <tr className="bg-light-gray">
                    <th className="text-uppercase">DAY</th>
                    <th className="text-uppercase" colspan="9">
                      Subjects
                    </th>
                  </tr>
                </thead>
                <tbody>
                  

                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(days.get("SUNDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(days.get("MONDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(days.get("TUESDAY"), colorForInterval);
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(
      days.get("WEDNESDAY"),
      colorForInterval
    );
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(
      days.get("THURSDAY"),
      colorForInterval
    );
    htmlData += `
                  </tr>
                  <tr className="tr-fixed">`;
    htmlData += generateTeacherRowForDay(days.get("FRIDAY"), colorForInterval);
    htmlData += `
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>`;

    return htmlData;
  }
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
