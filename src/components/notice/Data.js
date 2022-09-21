import React from "react";
import "./notice.css";
import AuthUser from "../AuthUser";
import Axios from "axios";
import URLS from "../urls.json";

const Data = ({ data }) => {
  const { role, token } = AuthUser();
  const hostURL = "https://soe-backend.herokuapp.com";
  const imageLink = hostURL + data.media_links;

  const onDelete = (id) => {
    console.log(URLS.hostUrl + "/v1/notices/" + id);
    const confirmation = window.confirm(
      `Do you want to delete request number ${id}?`
    );
    if (!confirmation) return;
    Axios({
      method: "delete",
      url: URLS.hostUrl + "/v1/notices/" + id,
      // url:"https://soe-backend.herokuapp.com/v1/notices",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((success) => {
        console.log(success);
        window.alert("Notice deleted successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="notice_container">
      <h3>{data.title} </h3>
      <p class="publish_date">
        Published on: {data.publish_date.substr(0, 10)} &nbsp;{" "}
        {data.publish_date.substr(11, 5)}
        
      </p>
      <p class="content">{data.content}</p>
      <a class="link" href={imageLink} target="blank">
        Click here to open file 
      </a>

      {role === "superuser" && (
        <button class="btndelete" onClick={() => onDelete(data.notice_id)}>
          <span>Delete</span>
        </button>
      )}

      {/* <img 
                src={imageLink}
            ></img> */}
    </div>
  );
};

export default Data;
