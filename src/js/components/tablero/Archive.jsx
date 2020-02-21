import React from "react";
import ReactLoading from "react-loading";
import { loadColors } from "../../../assets/dataFormat/dataLoading";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const Numbers = () => {
  let colors = ["green", "yellow", "red"];
  let classColor = "circle " + colors[getRandomInt(0, colors.length)];

  return (
    <div className="value">
      <div className={classColor} /> {getRandomInt(3, 95)}
    </div>
  );
};

const getColor = () => {
  let colors = [
    "#6fb98f",
    "#004445",
    "#2e5685",
    "#fcc169",
    "#cf455c",
    "#e89da2",
    "#e0b623",
    "#444444"
  ];
  return colors[getRandomInt(0, colors.length)];
};

const ArchivedIndicators = props => {
  let graph;

  if (props.type === "line") {
    props.data["datasets"] = loadColors(props.data, "line");
    graph = <i className="fa fa-line-chart" style={{ color: getColor() }} />;
  } else if (props.type === "bar") {
    props.data["datasets"] = loadColors(props.data, "bar");
    graph = <i className="fa fa-bar-chart" style={{ color: getColor() }} />;
  } else if (props.type === "doughnut") {
    props.data["datasets"] = loadColors(props.data, "doughnut");
    graph = <i className="fa fa-pie-chart" style={{ color: getColor() }} />;
  } else if (props.type === "horizontalBar") {
    props.data["datasets"] = loadColors(props.data, "horizontalBar");
    graph = (
      <i
        className="fa fa-bar-chart horizontal-bar"
        style={{ color: getColor() }}
      />
    );
  } else if (props.type === "numbers") {
    graph = <Numbers />;
  } else if (props.type === "loading") {
    graph = (
      <ReactLoading
        type="bubbles"
        color={getColor()}
        height={"40px"}
        width={"40px"}
      />
    );
  } else if (props.type === "error") {
    graph = <i className="fa fa-repeat" />;
  }
  return (
    <li className="unarchivedItem">
      <div className="archived-indicator">
        <div className="row">
          <div className="col col-3 graph-preview">{graph}</div>
          <div className="col col-6">
            <span>{props.title}</span>
          </div>
          <div className="col col-3">
            <span className="unarchive-button">Unarchive</span>
          </div>
        </div>
      </div>
    </li>
  );
};

const UnarchiveIndicator = props => (
  <div
    className={
      props.showPopout ? "unarchivedItems popover-active" : "unarchivedItems"
    }
  >
    <div className="unarchive" onClick={props.unarchiveHandler}>
      <span>
        Unarchive indicator ({props.data.length}){" "}
        <i className="fa fa-archive" />
      </span>
    </div>
    <div className="unarchive-popover">
      <span className="close-button" onClick={props.unarchiveHandler}>
        &times;
      </span>
      <ul className="unarchivedList">
        {props.data.map(value => (
          <ArchivedIndicators
            key={`item-${value.id}`}
            title={value.title}
            type={value.type}
            data={value.data}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default UnarchiveIndicator;
