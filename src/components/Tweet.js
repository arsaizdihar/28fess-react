import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles({
  multilineColor: {
    color: "white",
  },
});

const greenTextFieldStyles = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1DA1F2",
      fontSize: "1rem",
    },
    "& label": {
      color: "#1DA1F2",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1DA1F2",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
});

function Tweet(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [tweetText, setTweetText] = useState("");
  const [tweetLink, setTweetLink] = useState("");
  const [imageValue, setImageValue] = useState("");
  const classes = useStyles();

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 500,
      delay: 500,
    },
  });

  const [GreenTextField, setGreenTextField] = useState(TextField);
  useEffect(() => {
    setGreenTextField(greenTextFieldStyles(TextField));
  }, []);

  const postTweet = async (e) => {
    e.preventDefault();
    const withImage = imageValue !== "";
    if (!tweetText.toLowerCase().includes("dupan!")) {
      setErrorMsg("Tweet wajib berisi keyword 'dupan!'");
    } else {
      const mediaId = withImage ? await postImage() : null;
      const res = await fetch("https://dualapan.herokuapp.com/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tweetText, media_id: mediaId }),
      });
      if (res.ok) {
        if (errorMsg !== "") setErrorMsg("");
        const data = await res.json();
        setTweetLink(data.link);
      } else {
        setErrorMsg("Failed to upload tweet.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImageValue(file);
      }
    }
  };

  const postImage = async () => {
    let formData = new FormData();
    formData.append("files", imageValue);
    const res = await fetch("https://dualapan.herokuapp.com/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.media_id;
  };

  return (
    <animated.div className="inner" style={styles}>
      <form noValidate autoComplete="off" onSubmit={postTweet}>
        {tweetLink !== "" && window.location.replace(tweetLink)}
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography
              variant="h3"
              component="h3"
              className="title"
              fontWeight="fontWeightBold"
            >
              Tweet @28FESS
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <GreenTextField
              multiline
              rows={4}
              variant="outlined"
              style={{ width: "100%", color: "white" }}
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              error={errorMsg !== ""}
              label="Tweet Text"
              helperText={errorMsg}
              InputProps={{
                className: classes.multilineColor,
              }}
            />
          </Grid>
          {imageValue && (
            <Grid item xs={12} align="center">
              <img
                src={URL.createObjectURL(imageValue)}
                alt="your"
                style={{ maxHeight: "100px" }}
              />
            </Grid>
          )}
          <Grid item xs={12} align="center">
            <input
              accept="image/*"
              className={classes.input}
              hidden
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                {imageValue ? imageValue.name : "Upload an image (optional)"}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              <SendIcon style={{ paddingRight: "20px" }} />
              Post Tweet
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => props.history.push("/")}
            >
              Home
            </Button>
          </Grid>
        </Grid>
      </form>
    </animated.div>
  );
}

export default Tweet;
