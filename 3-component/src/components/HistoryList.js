import React from "react";
import { formatRelativeDate } from "../helpers.js";
import store from "../Store.js";
import List from "./List.js";

export default class HistoryList extends React.Component {
  constructor() {
    super();

    this.state = {
      historyList: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  handleClickRemove(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    const { onClick } = this.props;
    const { historyList } = this.state;

    return (
      <List
        data={historyList}
        onClick={onClick}
        hasDate={true}
        onRemove={(keyword) => this.handleClickRemove(keyword)}
        // List.js에서 조건부 렌더링으로 처리
        // renderItem={(item) => (
        //   <>
        //     <span>{item.keyword}</span>
        //     <span className="date">{formatRelativeDate(item.date)}</span>
        //     <button
        //       className="btn-remove"
        //       onClick={(event) => this.handleClickRemove(event, item.keyword)}
        //     />
        //   </>
        // )}
      />
    );
  }
}
