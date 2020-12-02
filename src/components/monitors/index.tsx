import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { selectMonitorIds } from "./monitors-slice";
import Monitor from "./components/monitor";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function Monitors(): JSX.Element {
  const classes = useStyles();
  const ids = useSelector(selectMonitorIds);

  if (ids.length === 0) {
    return (
      <div className={classes.messageContainer}>
        <Typography variant="body1">
          Use the <b>+</b> button above to add your monitors to this list.
        </Typography>
      </div>
    );
  }

  return (
    <List>
      {ids.map((id) => (
        <Monitor id={id} key={id} />
      ))}
    </List>
  );
}
