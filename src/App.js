import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Home from "./components/Home";
import Tweet from "./components/Tweet";
import Reply from "./components/Reply";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tweet" component={Tweet} />
          <Route exact path="/reply" component={Reply} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Quicksand', sans-serif",
    h3: {
      fontWeight: "bold",
    },
    palette: {
      primary: green,
    },
  },
});

export default App;
