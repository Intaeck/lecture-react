import React from 'react';

// li를 렌더링해주는 중복되는 기능을 모은 클래스
export default class List extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    }
  }

  //추상화 메서드
  renderItem(item, index) {
    throw 'renderItem()을 구현하세요'
  }

  render() {
    return (
      <ul className="list">
        {this.state.data.map((item, index) => {
          return (
            // React에서 list를 만드려면 고유한 key 값을 넣어야함
            <li key={item.id} onClick={() => this.props.onClick(item.keyword)}>
            {/* <li key={item.id} onClick={this.props.onClick(item.keyword)}> */}
              {this.renderItem(item, index)}
            </li>
          );
        })}
      </ul>
    )
  }
}