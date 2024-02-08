import { React } from "react";
import styles from "./styles/App.module.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/router/AppRouter";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
//import { screen } from "@testing-library/react";
import useInitAuth from './hooks/useInitAuth';

function App() {
    useInitAuth();
    // use-query-params adapeter for React Router 6
    // const RouteAdapter = ({ children }) => {
    //   const navigate = useNavigate();
    //   const location = useLocation();

    //   const adaptedHistory = React.useMemo(
    //     () => ({
    //       replace(location) {
    //         navigate(location, { replace: true, state: location.state });
    //       },
    //       push(location) {
    //         navigate(location, { replace: false, state: location.state });
    //       },
    //     }),
    //     [navigate]
    //   );
    //   return children({ history: adaptedHistory, location });
    // };

    return (
        <div>
            <BrowserRouter>
                <QueryParamProvider ReactRouterRoute={ReactRouter6Adapter}>
                    {/* <AuthProvider> */}
                    <header className="sticky top-0 z-20 max-md:hidden h-16 w-full border-b-2 border-b-gray-500 bg-gray-200">
                        <div className={styles.container}>
                            <Navbar id="top" />
                        </div>
                    </header>
                    <section>
                        <div
                            className={`${styles.container} min-h-screen  px-2 md:px-8`}
                        >
                            <AppRouter></AppRouter>
                        </div>
                    </section>

                    {/* <div className="sticky top-[100vh] bg-blue-500">Footer</div> */}
                    <footer className="sticky bottom-0 md:hidden z-20 h-16 w-full border-b-2 border-b-gray-500 bg-gray-200">
                        <div className={styles.container}>
                            <Navbar id="bottom" />
                        </div>
                    </footer>
                    {/* </AuthProvider> */}
                </QueryParamProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
