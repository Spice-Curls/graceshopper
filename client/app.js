import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  const [closed, setClosed] = useState(false)
  return (
    <div>
      <Route
        render={({history}) => (
          <Navbar closed={closed} setClosed={setClosed} history={history} />
        )}
      />
      <Routes closed={closed} />
    </div>
  )
}

export default App
