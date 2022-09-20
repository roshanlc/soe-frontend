import { Axios } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

import "./schedule.css";

// Requires to install a new package called "html-react-parser"
const parse = require("html-react-parser");

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
    const response = await https.get(`/${role}s/${user_id}/schedule`);
    setData(response.data);
    //console.log(dat);
  };

  function renderElement() {
    if (isObjectEmpty(dat)) {
      return <p>Loading.....</p>;
    } else {
      console.log("data loaded");
      // console.log(dat);

      // Create map and separate each days on the basis on name
      const days = new Map();
      days.set("SUNDAY", dat.days[0]);
      days.set("MONDAY", dat.days[1]);
      days.set("TUESDAY", dat.days[2]);
      days.set("WEDNESDAY", dat.days[3]);
      days.set("THURSDAY", dat.days[4]);
      days.set("FRIDAY", dat.days[5]);
      days.set("SATURDAY", dat.days[6]);

      // map to select color for each interval dynamically
      const colorForInterval = new Map([
        ["10:15-11:05", "bg-tomato"],
        ["11:05-11:55", "bg-sky"],
        ["11:55-12:45", "bg-green"],
        ["12:45-13:55", "bg-orange"],
        ["13:35-14:05", "bg-yellow"],
        ["14:05-14:55", "bg-pink"],
        ["14:55-15:45", "bg-purple"],
        ["15:45-16:35", "bg-lightred"],
      ]);

      return (
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
                    <th className="text-uppercase" colSpan={8}>
                      Subjects
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Generate For sunday */}

                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("SUNDAY"), colorForInterval)
                    )}
                  </tr>
                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("MONDAY"), colorForInterval)
                    )}
                  </tr>
                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("TUESDAY"), colorForInterval)
                    )}
                  </tr>
                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("WEDNESDAY"), colorForInterval)
                    )}
                  </tr>
                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("THURSDAY"), colorForInterval)
                    )}
                  </tr>
                  <tr className="tr-fixed">
                    {parse(
                      generateRowForDay(days.get("FRIDAY"), colorForInterval)
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
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

// return (
//   <div>
//     <div className="container">
//       <div className="timetable-img text-center">
//         <img src="img/content/timetable.png" alt="" />
//       </div>
//       <div className="table-responsive">
//         <table className="table table-bordered text-center">
//           <thead>
//             <tr className="bg-light-gray">
//               <th className="text-uppercase">Time</th>
//               <th className="text-uppercase">10:15-11:05</th>
//               <th className="text-uppercase">11:05-11:55</th>
//               <th className="text-uppercase">11:55-12:45</th>
//               <th className="text-uppercase">12:45-13:55</th>
//               <th className="text-uppercase">13:35-14:05</th>
//               <th className="text-uppercase">14:05-14:55</th>
//               <th className="text-uppercase">14:55-15:45</th>
//               <th className="text-uppercase">15:45-16:35</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* <tr>
//               <td className="align-middle">SUN</td>
//               <td>
//                 {intervals.get("SUNDAY") == null
//                   ? console.log("empty")
//                   : null}

//                 <span>{dat.days[0].intervals[0].course_title}</span>
//                 <div className="font-size13 text-light-gray">
//                   {dat.days[0].intervals[0].teacher_name}
//                 </div>
//               </td>
//               <td>
//                 <span>{dat.days[0].intervals[1].course_title}</span>
//                 <div className="font-size13 text-light-gray">
//                   {dat.days[0].intervals[1].teacher_name}
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Dance
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr> */}
//             {/* <tr>
//               <td className="align-middle">MON</td>
//               <td>
//                 <span>{dat.days[1].intervals[0].course_title}</span>
//                 <div className="font-size13 text-light-gray">
//                   {dat.days[1].intervals[0].teacher_name}
//                 </div>
//               </td>
//               <td>
//                 <span>{dat.days[1].intervals[1].course_title}</span>
//                 <div className="font-size13 text-light-gray">
//                   {dat.days[1].intervals[1].teacher_name}
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Art
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   10:00-11:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Kate Alley
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Yoga
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   10:00-11:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Marta Healy
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr> */}
//             <tr>
//               <td className="align-middle">TUE</td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Break
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   11:00-12:00
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="align-middle">WED</td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Art
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   12:00-1:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Kate Alley
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Dance
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   12:00-1:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   12:00-1:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Yoga
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   12:00-1:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Marta Healy
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="align-middle">THU</td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td className="align-middle">FRI</td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td className="bg-light-gray"></td>
//               <td>
//                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   Music
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   1:00-2:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   Ivana Wong
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//               <td>
//                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">
//                   English
//                 </span>
//                 <div className="margin-10px-top font-size14">
//                   9:00-10:00
//                 </div>
//                 <div className="font-size13 text-light-gray">
//                   James Smith
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
// );
