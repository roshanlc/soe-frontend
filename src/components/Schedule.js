import React from 'react'
import { useEffect, useState } from "react"
import AuthUser from './AuthUser';

import "./schedule.css"

const Schedule = () => {
  const { http } = AuthUser();

  const [dat, setData] = useState([])

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = () => {
    http.get(`/schedules?program_id=1&semester_id=6`).then((res) => {
      setData(res.data);
      console.log(res.data)
    });
  }


  function renderElement() {
    // if (dat) {
    //   return <div>
    //     <div className="container">
    //       <div className="timetable-img text-center">
    //         <img src="img/content/timetable.png" alt="" />
    //       </div>
    //       <div className="table-responsive">
    //         <table className="table table-bordered text-center">
    //           <thead>
    //             <tr className="bg-light-gray">
    //               <th className="text-uppercase">Time
    //               </th>
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



    //             <tr>
    //               <td className="align-middle">SUN</td>
    //               <td>
    //                 <span>{dat[0].intervals[0].course_title}
    //                 </span>
    //                 <div className="font-size13 text-light-gray">{dat[0].intervals[0].teacher_name}</div>
    //               </td>

    //               <td>
    //                 <span>{dat[0].intervals[1].course_title}
    //                 </span>
    //                 <div className="font-size13 text-light-gray">{dat[0].intervals[1].teacher_name}</div>
    //               </td>


    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td>
    //                 <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Dance</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td className="align-middle">MON</td>
    //               <td>
    //                 <span>{dat[1].intervals[0].course_title}
    //                 </span>
    //                 <div className="font-size13 text-light-gray">{dat[1].intervals[0].teacher_name}</div>
    //               </td>
    //               <td>
    //                 <span>{dat[1].intervals[1].course_title}
    //                 </span>
    //                 <div className="font-size13 text-light-gray">{dat[1].intervals[1].teacher_name}</div>
    //               </td>
    //               <td>
    //                 <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
    //                 <div className="margin-10px-top font-size14">10:00-11:00</div>
    //                 <div className="font-size13 text-light-gray">Kate Alley</div>
    //               </td>
    //               <td>
    //                 <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
    //                 <div className="margin-10px-top font-size14">10:00-11:00</div>
    //                 <div className="font-size13 text-light-gray">Marta Healy</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>

    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td className="align-middle">TUE</td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-lightred padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Break</span>
    //                 <div className="margin-10px-top font-size14">11:00-12:00</div>
    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td className="align-middle">WED</td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-purple padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Art</span>
    //                 <div className="margin-10px-top font-size14">12:00-1:00</div>
    //                 <div className="font-size13 text-light-gray">Kate Alley</div>
    //               </td>
    //               <td>
    //                 <span className="bg-sky padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Dance</span>
    //                 <div className="margin-10px-top font-size14">12:00-1:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">12:00-1:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-green padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Yoga</span>
    //                 <div className="margin-10px-top font-size14">12:00-1:00</div>
    //                 <div className="font-size13 text-light-gray">Marta Healy</div>
    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>

    //             <tr>
    //               <td className="align-middle">THU</td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td className="align-middle">FRI</td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //               <td className="bg-light-gray">

    //               </td>
    //               <td>
    //                 <span className="bg-yellow padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">Music</span>
    //                 <div className="margin-10px-top font-size14">1:00-2:00</div>
    //                 <div className="font-size13 text-light-gray">Ivana Wong</div>
    //               </td>
    //               <td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td><td>
    //                 <span className="bg-pink padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16  xs-font-size13">English</span>
    //                 <div className="margin-10px-top font-size14">9:00-10:00</div>
    //                 <div className="font-size13 text-light-gray">James Smith</div>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // }
    // else {
      return <p>Loading.....</p>
    // }
  }

  return (
    <div>
      <h1 className='mb-4 mt-4'>Schedule</h1>
      {renderElement()}
    </div>
  )
}

export default Schedule
