/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import moment from "moment";
import "moment/locale/ru";

function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

const withPretty = (Component, propName) => {
  return class extends React.Component {
    render() {
      const date = moment(this.props.date);
      const dateNow = moment();
      const differenceHours = dateNow.diff(date, "hour");
      const differenceDays = dateNow.diff(date, "days");
      const props = { [propName]: null };
      if (differenceHours < 1) {
        props[propName] = "12 минут назад";
      } else if (differenceHours > 24 && /.*[2-4]$/m.test(differenceDays)) {
        props[propName] = `${dateNow.diff(date, "days")} дня назад`;
      } else if (differenceHours > 24) {
        props[propName] = `${dateNow.diff(date, "days")} дней назад`;
      } else {
        props[propName] = "5 часов назад";
      }
      return <Component {...this.props} {...props} />;
    }
  };
};

const DateTimePretty = withPretty(DateTime, "date");

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => (
    <Video key={item.id} url={item.url} date={item.date} />
  ));
}

export default function App() {
  const [list, setList] = useState([
    {
      id: 1,
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-07-31 13:24:00",
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-03-03 12:10:00",
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2018-02-03 23:16:00",
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-05-22 12:10:00",
    },
    {
      id: 5,
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-05-24 21:20:00",
    },
    {
      id: 6,
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2022-05-24 18:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
