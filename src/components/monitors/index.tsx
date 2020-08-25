import React from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { selectMonitorIds } from "./monitors-slice";
import Monitor from "./components/monitor";

export default function Monitors(): JSX.Element {
  const ids = useSelector(selectMonitorIds);

  return (
    <List>
      {ids.map((id) => (
        <Monitor id={id} key={id} />
      ))}
    </List>
  );
}
