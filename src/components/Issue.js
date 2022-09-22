import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthUser from "./AuthUser";
import "./Issue.css";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "bootstrap";

const notify = () => toast("Here is your toast.");

const parse = require("html-react-parser");

export default function Issue() {
  const { role, user_id, token, https, setToken } = AuthUser();
  // user issues returned from server is an array
  const [userIssues, setUserIssues] = useState([]);

  // For admin, it is an object
  const [adminIssues, setAdminIssues] = useState(Object);

  // while submitting issues
  const [issueContent, setIssueContent] = useState(String);

  // Send toast as notification

  const submitIssue = async () => {
    let form = new FormData();
    form.append("issue", issueContent);

    // api call
    https.post("/issues", form).then((res) => {
      if (res.status === 201) {
        alert("Issue was registered.");
        console.log("Issue registered");
      } else {
        alert("Some error occured!");
        alert("error", res.status, res.data);
      }
    });
  };

  // Marks issue as read
  const markIssueAsRead = async (issueID) => {
    https.put(`/issues/${issueID}`).then((response) => {
      if (response.status == 200)
        console.log(`Success marking issue id : ${issueID} as read`);
      else console.log(`Error marking issue id : ${issueID} as read`);
    });
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetch issues according to roles

  const fetchIssues = () => {
    if (role === "student") {
      // returns null if no issues
      https.get(`students/${user_id}/issues`).then((response) => {
        setUserIssues(response.data);
        console.log("Student issues");
        console.log(response.data);
      });
    } else if (role === "teacher") {
      // return null if no issues
      https.get(`teachers/${user_id}/issues`).then((response) => {
        setUserIssues(response.data);
        console.log("teacher issues");
        console.log(response.data);
      });
    } else if (role === "superuser") {
      // need to fetch through filter either read or unread and blah blah

      https.get(`/issues`).then((response) => {
        setAdminIssues(response.data);
        console.log("Admin can see following issues:");
        console.log(response.data);
      });
    }
  };

  // for student rendering
  if (role === "student" || role === "teacher") {
    return (
      <Tabs>
        <TabList>
          <Tab>Issues by you</Tab>
          <Tab>Post Issue</Tab>
        </TabList>

        <TabPanel>
          {/* Isssues to be shown here */}
          <div>
            {userIssues === null ? (
              <p>No issues to shown as issues length = (</p>
            ) : (
              <ol>
                <p>Your issues are shown below.</p>
                {userIssues.map((element) => {
                  return (
                    <li>
                      <div className="issue-box">
                        <p>
                          <span class="issue-title">
                            Issue: {element.issue}
                          </span>
                        </p>
                        {/* My bad boys, it is indeed issue_d */}
                        <p>
                          <span class="issue-id">
                            Issue ID:{element.issue_d}
                          </span>
                        </p>
                        <p>
                          <span class="issue-read">
                            Read: {String(element.read)}
                          </span>
                        </p>
                        <p>
                          <span class="issue-created">
                            Created: {element.created_at}
                          </span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Issue to post here */}

          <div className="row justify-content-center pt-5">
            <div className="col-sm-8">
              <div className="card p-3">
                <h1 className="text-center mb-3">Register Issue </h1>
                <div className="form-group">
                  <label>Issue Content:</label>
                  <textarea
                    rows={8}
                    className="form-control"
                    placeholder="Explain your issue in details."
                    onChange={(e) => setIssueContent(e.target.value)}
                    id="issue"
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={submitIssue}
                  className="btn btn-primary mt-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    );
  } else {
    return (
      <Tabs>
        <TabList>
          <Tab>Total Issues</Tab>
        </TabList>

        <TabPanel>
          {/* Isssues to be shown here  for admin*/}

          <h4>Issues</h4>
          <div>
            {JSON.stringify(adminIssues) === "{}" ? (
              <p>No issues to show.</p>
            ) : (
              <ol>
                <p>
                  Your issues are shown below. Total Issues ={" "}
                  {adminIssues.issues.length}
                  <br></br>
                  <sub>
                    <u>Note:</u> Unread issues are shown at top
                  </sub>
                </p>

                {adminIssues.issues.map((element) => {
                  return (
                    <li>
                      <div className="issue-box">
                        <p>
                          <span class="issue-title">
                            Issue: {element.issue}
                          </span>
                        </p>
                        {/* My bad boys, it is indeed issue_d */}
                        <p>
                          <span class="issue-id">
                            Issue ID:{element.issue_d}
                          </span>
                        </p>
                        <p>
                          <span class="issue-read">
                            Read: <u>{String(element.read)}</u>
                          </span>
                        </p>
                        <p>
                          <p>
                            <span className="issue-read">
                              By: {element.user_role}
                            </span>
                          </p>
                          <span class="issue-created">
                            Created: {element.created_at}
                          </span>
                        </p>
                        <button
                          className="btn btn-success"
                          disabled={element.read ? "disabled" : ""}
                          onClick={() => {
                            markIssueAsRead(element.issue_d);
                          }}
                        >
                          Mark as Read
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}
