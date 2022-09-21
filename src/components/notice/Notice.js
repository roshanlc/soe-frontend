import { useEffect, useState } from "react"
import Data from './Data'
import './notice.css'
import AuthUser from '../AuthUser';
import PostNotice from "./PostNotice";


const Notice = () => {
    const [data, setData] = useState([])
    // const { role, token} = AuthUser();

    const url = "https://soe-backend.herokuapp.com/v1/notices"

    const getData = async () => {
        const response = await fetch(url)
        const json = await response.json()
        setData(json.notices)
    }

    console.log(data)

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="">
          <div className="two alt-two">
  <h1>Notice Board
    <span>School of Engineering</span>
  </h1>
</div>
            {data.map(a => (
                <Data key={a.notice_id} data={a}/>

            ))}
        </div>
    )
}

export default Notice