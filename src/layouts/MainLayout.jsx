import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const MainLayout = ({ children }) => (
  <React.Fragment>
    <Wrapper>
      <Sidebar />
      <Main>
        <Navbar />
        <Content>
          <Suspense fallback={<Loader />}>
            {children}
            <Outlet />
          </Suspense>
        </Content>
        <Footer />
      </Main>
    </Wrapper>
  </React.Fragment>
);

export default MainLayout;
