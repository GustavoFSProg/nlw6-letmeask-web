import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewRoom from './pages/NewRoom'

import { AuthContextProvider } from './Contexts/AuthContext'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/new-room" component={NewRoom} />
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>
  )
}
