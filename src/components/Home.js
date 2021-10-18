import { Grid, Typography, Link, Button } from "@material-ui/core";
import logo from "../static/images/28.png";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useSpring, animated } from "react-spring";

const Home = (props) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 500,
      delay: 500,
    },
  });
  const captionStyle = {
    color: "#FFFFF",
    fontFamily: "'Quicksand', sans-serif",
    fontSize: "1em",
    lineHeight: 1.625,
    fontWeight: 400,
  };
  return (
    <animated.div className="inner" style={styles}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} align="center">
          <img className="logo" src={logo} alt="SMAN 28 Jakarta" />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography
            variant="h3"
            component="h3"
            className="title"
            fontWeight="fontWeightBold"
          >
            @28FESS
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="body1" component="p" style={captionStyle}>
            28FESS adalah akun menfess otomatis khusus untuk
            <span className="bold"> siswa 28</span>. 28FESS
            <em className="color-red"> bukan</em> official account dan tidak
            terkait dengan instansi manapun.
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Link
            href="https://forms.gle/C4vcGydojXYCq8Hu7"
            style={{ ...captionStyle, color: "red", fontWeight: "bold" }}
            target="_blank"
          >
            Report Masalah/Kritik/Saran di sini.
          </Link>
        </Grid>
        <Grid item xs={12} align="center">
          <Link
            href="https://liff.line.me/1645278921-kWRPP32q?accountId=235fcixk&openerPlatform=native&openerKey=chatMessage"
            style={{ ...captionStyle, color: "#1bf551", fontWeight: "bold" }}
            target="_blank"
          >
            Add Line Official Account 28FESS BOT
          </Link>
        </Grid>
        <Grid item xs={12} align="center">
          <hr />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="default"
            size="large"
            onClick={() => props.history.push("/tweet")}
          >
            <TwitterIcon style={{ color: "#1DA1F2" }} /> Tweet
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => props.history.push("/reply")}
          >
            <TwitterIcon style={{ color: "#1DA1F2" }} /> Reply Tweet
          </Button>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default Home;
