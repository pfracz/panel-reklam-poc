import { Redirect, Route, RouteProps } from 'react-router';
import { isLoggedIn } from '../helpers/auth';

type Props = {
    children: JSX.Element;
};

export default function PrivateRoute({ children, ...rest }: Props & RouteProps) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/unauthorized',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
}
