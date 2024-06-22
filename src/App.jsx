import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { store } from "./redux/store";

import routes from "./routes";

import Loader from "./components/Loader";

import ThemeProvider from "./contexts/ThemeProvider";
import SidebarProvider from "./contexts/SidebarProvider";
import LayoutProvider from "./contexts/LayoutProvider";
import ChartJsDefaults from "./utils/ChartJsDefaults";
import AuthProvider from "./contexts/AuthProvider";
import FloatingAlertsProvider from "./contexts/FloatingAlertsProvider";

const App = () => {
  const content = useRoutes(routes);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="Manage Maggie's EVs"
        defaultTitle="Manage Maggie's EVs"
      />
      <Suspense fallback={<Loader />}>
        <Provider store={store}>
          <ThemeProvider>
            <SidebarProvider>
              <LayoutProvider>
                <AuthProvider>
                  <FloatingAlertsProvider>
                    <ChartJsDefaults />
                    {content}
                  </FloatingAlertsProvider>
                </AuthProvider>
              </LayoutProvider>
            </SidebarProvider>
          </ThemeProvider>
        </Provider>
      </Suspense>
    </HelmetProvider>
  );
};

export default App;
