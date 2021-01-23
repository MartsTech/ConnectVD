import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import {
  openMenu,
  selectActiveMenu,
  setMenuHeight,
} from "../../features/dropdownSlice";
import {
  MeDocument,
  MeQuery,
  useChangeStatusMutation,
} from "../../generated/graphql";
import styles from "../../styles/Dropdown.module.css";
import { Section } from "../Section";
import { StatusBadge } from "../StatusBadge";

export const Status: React.FC = () => {
  const activeMenu = useSelector(selectActiveMenu);

  const dispatch = useDispatch();

  const [changeStatus] = useChangeStatusMutation();

  const setNewStatus = async (status: string) => {
    await changeStatus({
      variables: { status },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data!.changeStatus,
          },
        });
      },
    });
    dispatch(openMenu("main"));
  };

  const calcHeight = (el: any) => {
    const menuHeight = el.offsetHeight;
    dispatch(setMenuHeight(menuHeight));
  };

  return (
    <CSSTransition
      in={activeMenu === "status"}
      unmountOnExit
      timeout={500}
      classNames="secondary"
      onEnter={calcHeight}
    >
      <div className={styles.menu}>
        <div className={styles.items}>
          <Section
            left={<ArrowBackIosIcon />}
            onClick={() => dispatch(openMenu("main"))}
          />
          <Section
            title="Available"
            left={
              <StatusBadge
                status="available"
                className={styles.status}
                id={styles.available}
              />
            }
            onClick={() => setNewStatus("available")}
          />
          <Section
            title="Appear away"
            left={
              <StatusBadge
                status="away"
                className={styles.status}
                id={styles.available}
              />
            }
            onClick={() => setNewStatus("away")}
          />
          <Section
            title="Do not disturb"
            left={
              <StatusBadge
                status="busy"
                className={styles.status}
                id={styles.available}
              />
            }
            onClick={() => setNewStatus("busy")}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
