import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthUser from "./AuthUser";
import "./Issue.css";

const parse = require("html-react-parser");

export default function Issue() {
  const { role, user_id, token, https } = AuthUser();
  // user issues returned from server is an array
  const [userIssues, setUserIssues] = useState([]);

  // For admin, it is an object
  const [adminIssues, setAdminIssues] = useState(Object);

  useEffect(() => {
    fetchIssues();
  }, []);

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
  if (role === "student") {
    return (
      <Tabs>
        <TabList>
          <Tab>Issues by you</Tab>
          <Tab>Post Issue</Tab>
        </TabList>

        <TabPanel>
          {/* Isssues to be shown here */}
          <div>
            {JSON.stringify(userIssues) === null ? (
              <p>No issues to shown as issues length = (</p>
            ) : (
              // Data nai show hudena kina ho lol
              <div>
                <p>
                  Your issues are shown below. Total issues length =
                  {userIssues.length} <br></br> There are 1 or more issues still
                  I cannot show it lol
                </p>
                {userIssues.forEach((element) => {
                  <li key={element.issue_d}>{element.issue}</li>;
                })}
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          {/* Issue to post here */}
          <h4>Post an issue</h4>
          <hr />
        </TabPanel>
      </Tabs>
    );
  } else {
    return (
      <Tabs>
        <TabList>
          <Tab>Issues by you</Tab>
          <Tab>Post Issue</Tab>
        </TabList>

        <TabPanel>
          {/* Isssues to be shown here */}

          <h4>Issues</h4>
          <hr />
        </TabPanel>
        <TabPanel>
          {/* Issue to post here */}
          <h4>Post an issue</h4>
          <hr />
        </TabPanel>
      </Tabs>
    );
  }
}
