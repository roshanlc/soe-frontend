import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthUser from "./AuthUser";
import "./dashboard.css";

// Requires to install a new package called "html-react-parser"
const parse = require("html-react-parser");

export default function Dashboard() {
  const { role, user_id, token, https } = AuthUser();

  // user details returned from server is an object
  const [userDetails, setUserDetails] = useState(Object);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    // Separating work for each role

    if (role === "student") {
      // https.get(`/students/${user_id}`).then((res) => {
      //   setUserDetails(res.data);
      //   console.log("student data = ");
      //   console.log(res.data);
      // });

      const response = await https.get(`/students/${user_id}`);
      setUserDetails(response.data);
      console.log("student data = ");
      console.log(response.data);
    }
    // for teacher
    else if (role === "teacher") {
      /*   
         https.get(`/teachers/${user_id}`).then((res) => {
        setUserDetails(res.data);
        console.log("teacher data = ");

        console.log(res.data);
      });
      */

      const response = await https.get(`/teachers/${user_id}`);
      setUserDetails(response.data);
      console.log("teacher data = ");
      console.log(response.data);
    } else {
      // for superuser
      /*
      https.get(`/superusers/${user_id}`).then((res) => {
      
        setUserDetails(res.data);
        console.log("superuser data = ");

        console.log(res.data);
      });
*/
      const response = await https.get(`/superusers/${user_id}`);
      setUserDetails(response.data);
      console.log("superusers data = ");
      console.log(response.data);
    }
  };

  // Generate Dashboard for student
  function genDashboardForStudent(userdetail) {
    let htmlData =
      `
      <div>
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 class="f-w-600">` +
      userdetail.student.name +
      `</h6>
                    <p>` +
      userdetail.student.program +
      `</p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">` +
      userdetail.student.email +
      `
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Symbol</p>
                        <h6 class="text-muted f-w-400">` +
      userdetail.student.symbol_no +
      `
                        </h6>
                      </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      ` +
      userdetail.student.level +
      `
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Department</p>
                        <h6 class="text-muted f-w-400">
                          ` +
      userdetail.student.department +
      `
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">
                          PU Registration Number
                        </p>
                        <h6 class="text-muted f-w-400">
                          ` +
      userdetail.student.pu_regd_no +
      `
                        </h6>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Program</p>
                        <h6 class="text-muted f-w-400">
                          ` +
      userdetail.student.program +
      `
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Semester</p>
                        <h6 class="text-muted f-w-400">
                          ` +
      userdetail.student.semester +
      `
                        </h6>
                      </div>
                    </div>
                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="facebook"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-facebook feather icon-facebook facebook"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="twitter"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-twitter feather icon-twitter twitter"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="instagram"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-instagram feather icon-instagram instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    return htmlData;
  }

  // Generate Dashboard for teacher
  function genDashboardForTeacher(userdetail) {
    let htmlData =
      `
    <div>
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 class="f-w-600">` +
      userdetail.teacher.name +
      `</h6>
                    <p>` +
      " Teacher" +
      `</p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">` +
      userdetail.teacher.email +
      `
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Contact No.</p>
                        <h6 class="text-muted f-w-400">` +
      userdetail.teacher.contact_no +
      `
                        </h6>
                      </div>
                    </div>
                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                      ` +
      "" +
      `
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Education</p>
                        <h6 class="text-muted f-w-400">
                        <ul>
                          `;

    userdetail.teacher.academics.forEach((e) => {
      htmlData += `<li>${e}</li>`;
    });

    htmlData += `</ul>
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">
                          Teaches
                        </p>
                        <h6 class="text-muted f-w-400">
                          `;

    let teach = [];

    userdetail.teacher.teaches_at.forEach((element) => {
      teach.push(
        element.course + " at " + element.program + " (" + element.level + ")"
      );
    });

    htmlData += `<ul>`;
    teach.forEach((e) => {
      htmlData += `<li>${e}</li>`;
    });
    htmlData += `</ul>
                        </h6>
                      </div>
                    </div>
                   
                    </div>
                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="facebook"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-facebook feather icon-facebook facebook"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="twitter"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-twitter feather icon-twitter twitter"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#!"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="instagram"
                          data-abc="true"
                        >
                          <i
                            class="mdi mdi-instagram feather icon-instagram instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    return htmlData;
  }

  // dashboard with public profile for teacher
  function genDashForTeacher(userdetail) {
    return (
      <div>
        <div class="page-content page-container" id="page-content">
          <div class="padding">
            <div class="row container d-flex justify-content-center">
              <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-4 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src="https://img.icons8.com/bubbles/100/000000/user.png"
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>
                        <h6 class="f-w-600">{userdetail.teacher.name}</h6>
                        <p>Teacher</p>
                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Email</p>
                            <h6 class="text-muted f-w-400">
                              {userdetail.teacher.email}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Contact No.</p>
                            <h6 class="text-muted f-w-400">
                              {userdetail.teacher.contact_no}
                            </h6>
                          </div>
                        </div>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Education</p>
                            <h6 class="text-muted f-w-400">
                              <ul>
                                {userdetail.teacher.academics.map((e) => {
                                  return <li key={e}>{e}</li>;
                                })}
                              </ul>
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Teaches</p>
                            <h6 class="text-muted f-w-400">
                              {userdetail.teacher.teaches_at.map((e) => {
                                return (
                                  <li key={e.course_id}>
                                    {e.course} at {e.program} ({e.level})
                                  </li>
                                );
                              })}
                            </h6>
                          </div>
                        </div>
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Public Profile
                        </h6>
                        <p>
                          Public profile is supported by backend but due to time
                          constraint, it could be not added to frontend.
                        </p>
                      </div>
                      <ul class="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              class="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate Dashboard for superuser
  function genDashboardForSuperuser(userdetail) {
    let htmlData =
      `
    <div>
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-6 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 class="f-w-600">` +
      userdetail.superuser.name +
      `</h6>
                    <p>` +
      "SUPERUSER" +
      `</p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Added by</p>
                        <h6 class="text-muted f-w-400">` +
      userdetail.superuser.added_by +
      `
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">User ID</p>
                        <h6 class="text-muted f-w-400">` +
      user_id +
      `
                        </h6>
                      </div>
                    </div>
                   

                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    return htmlData;
  }
  function renderElement() {
    if (JSON.stringify(userDetails) === "{}") {
      console.log("empty");
      return <p>Loading.....</p>;
    } else {
      // if not empty`
      console.log("role = " + role);
      if (role === "student") {
        return parse(genDashboardForStudent(userDetails));
      } else if (role === "teacher") {
        return genDashForTeacher(userDetails);
      } else {
        return parse(genDashboardForSuperuser(userDetails));
      }
    }
  }

  return (
    <div>
      <h1 className="mb-4 mt-4">Dashboard page</h1>
      {renderElement()}
    </div>
  );
}
