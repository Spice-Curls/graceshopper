import React from 'react'
import {Route} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Route render={({history}) => <Navbar history={history} />} />
      <Routes />
    </div>
  )
}

export default App
