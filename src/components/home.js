import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthUser from "./AuthUser";
import "./notice.css";

import URLS from "./urls";

export default function Home() {
  const { http, https, role } = AuthUser();

  const [notices, setNotices] = useState(Object);
  useEffect(() => {
    fetchNotices();
  }, []);

  // notice delete
  const deleteNotice = async (noticeID) => {
    https.delete(`/notices/${noticeID}`).then((response) => {
      if (response.status === 200) {
        alert("Notice was deleted successfully");
      } else {
        console.log("Error occurred");
        console.log(response.data);
      }
    });
  };

  const fetchNotices = async () => {
    // fetching all notices
    http.get(`/notices`).then((response) => {
      console.log(response.data);
      // set if 200 only
      if (response.status === 200) {
        setNotices(response.data);
      }
    });
  };

  return (
    <div>
      <h1>
        Notice Board
        <span>School of Engineering</span>
      </h1>
      <hr />
      {JSON.stringify(notices) === "{}" ? (
        <p>No notices</p>
      ) : (
        <div className="two alt-two">
          {notices.notices.map((data, id) => {
            return (
              <div className="notice_container" key={id}>
                <h4>{data.title} </h4>
                <hr />
                <p>{data.content}</p>
                <p>Published on: {data.publish_date}</p>
                {data.media_links != null ? (
                  <p>
                    {data.media_links.map((links, index) => {
                      return (
                        <a
                          href={URLS.baseURL + links}
                          key={index}
                          target="_blank"
                        >
                          File {index + 1}
                        </a>
                      );
                    })}
                  </p>
                ) : null}
                {role === "superuser" ? (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure about deleting the notice?"
                        )
                      ) {
                        deleteNotice(data.notice_id);
                      }
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
