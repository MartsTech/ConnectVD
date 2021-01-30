import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, selectSidebar } from "../features/sidebarSlice";
import styles from "../styles/AppWrapper.module.css";
import { useWindowWidth } from "../utils/useWindowWidth";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const AppWrapper: React.FC = ({ children }) => {
  const sidebar = useSelector(selectSidebar);
  const dispatch = useDispatch();

  const width = useWindowWidth();

  useEffect(() => {
    if (typeof width === "number" && width < 650) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.body}>
        {sidebar && <Sidebar />}
        {children}
      </div>
    </div>
  );
};
