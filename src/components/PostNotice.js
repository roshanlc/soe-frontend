import { getByTitle } from "@testing-library/react";
import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";

import "./Issue.css";

export default function PostNotice() {
  const navigate = useNavigate();

  const { fileUpload, role } = AuthUser();

  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [files, setFiles] = useState();
  // function to post notice
  function postNotice(title, content, files) {
    let form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("media", files);

    // api call
    fileUpload.post("/notices", form).then((res) => {
      if (res.status === 201) {
        alert("Notice was published.");
        console.log("Notice published");
      } else {
        alert("Some error occured!");
        alert("error", res.status, res.data);
      }
    });
  }

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-8">
        <div className="card p-3">
          <h1 className="text-center mb-3">Post Notice</h1>
          <div className="form-group">
            <label>Tile:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Notice title"
              id="notice_title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Notice Content:</label>
            <textarea
              rows={6}
              className="form-control"
              placeholder="Explain your notice in details."
              id="issue"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label>Files:</label>
            <input
              className="form-control"
              id="file"
              type="file"
              placeholder="10 Files Max"
              onChange={(e) => {
                setFiles(e.target.files[0]);
              }}
              multiple
            />
          </div>

          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={() => {
              if (title == "" || content == "") {
                alert("Please fill the text areas before publishing.");
              } else {
                postNotice(title, content, files);
              }
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
