import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";
import DataState from "./context/dataContext.jsx";
const App = ()=>{
  return(
    <DataState>
      <Sidebar />
      <Main />
    </DataState>
  )
}
export default App;