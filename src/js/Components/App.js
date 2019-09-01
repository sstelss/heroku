import React from 'react'
import MainPage from './MainPage'

import UserPanel from './UserPanel'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PersonalPage from './PersonalPage'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={MainPage} />
        <Route path="/userPanel" component={UserPanel} />
        <Route path="/personalPage" component={PersonalPage} />
      </div>
    </Router>
  )
}

export default App
