import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateAdvertisementPage from './pages/CreateAdvertisementPage';
import AdvertisementPanelPage from './pages/AdvertisementPanelPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/advertisements/new">
                    <CreateAdvertisementPage />
                </PrivateRoute>

                <PrivateRoute path="/advertisements">
                    <AdvertisementPanelPage />
                </PrivateRoute>

                <Route path="/unauthorized">
                    <UnauthorizedPage />
                </Route>

                <Route path="/" exact>
                    <LandingPage />
                </Route>

                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
