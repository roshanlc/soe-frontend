import React from 'react'
import  Form  from './Form'
import URLS from "../urls.json"
import Axios from 'axios'
import AuthUser from '../AuthUser';


const PostNotice = () => {
  const { role, user_id, token, https } = AuthUser();
console.log(role);

    const onSubmit =  (event) => {
         event.preventDefault(event);
         const data = new FormData();
         data.append('content', event.target.content.value);
         data.append('title', event.target.title.value);
         data.append('media', event.target.file.files[0]);


         
         Axios({
            method: 'post',
            url: URLS.hostUrl+'/v1/notices',
            // url:"https://soe-backend.herokuapp.com/v1/notices",
             data: data,
             headers: {
                'Authorization': `Bearer ${token}`,
             }
         })
             .then((success) => {
                console.log(success)
                window.alert("Notice posted successfully")
                window.location.href='/'
                
                
             })
             .catch((error) => {
                 console.log(error);
                
             });
     };
    
    

   
  return (
    <div>
    <Form onSubmit={onSubmit}/>
</div>
  );
  
};
export default PostNotice;

