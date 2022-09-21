import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import Admin from './navbar/admin';

function App() {
  const {getToken, role} = AuthUser();
  console.log(role)
  if(!getToken()){
    return <Guest />
  }
  else if(role==='student'){
    return <Auth/>
  }
  else if(role==='superuser'){
    return <Admin/>
  }

}

export default App;
