import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LayoutPage from "./components/LayoutPage/LayoutPage";
import { useSelector } from 'react-redux';

const App = () => {
  const { isLogin } = useSelector((state) => state);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch className='container'>
          <Route path='/login'>
            <LayoutPage page="signin" />
          </Route>
          <Route path='/contacts'>
            <LayoutPage page="contacts" />
          </Route>
        </Switch>
        {!isLogin ? <Redirect to={"/login"} /> : <Redirect to={`/contacts`} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
