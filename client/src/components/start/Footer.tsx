import React from "react";
import styles from "../../styles/Footer.module.css";
import { Link } from "react-scroll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";

const social = [
  {
    name: "facebook",
    url: "https://www.facebook.com/m.velkov123/",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/martin-velkov-228aa91a8/",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/m_velkov123/",
  },
  {
    name: "github",
    url: "https://github.com/MartsTech",
  },
];

export const Footer: React.FC = () => {
  const socials = social.map((network) => {
    return (
      <div className={styles.social} key={network.name}>
        <a href={network.url}>
          {network.name === "facebook" && <FacebookIcon fontSize="large" />}
          {network.name === "instagram" && <InstagramIcon fontSize="large" />}
          {network.name === "linkedin" && <LinkedInIcon fontSize="large" />}
          {network.name === "github" && <GitHubIcon fontSize="large" />}
        </a>
      </div>
    );
  });
  return (
    <footer className={styles.footer}>
      <div className={styles.goTop}>
        <Link
          activeClass="active"
          to="meeting"
          spy={true}
          smooth={true}
          duration={1000}
        >
          <div className={styles.topButton}>
            <ArrowUpwardIcon fontSize="large" />
          </div>
        </Link>
      </div>
      <div className={styles.socials}>{socials}</div>
    </footer>
  );
};
