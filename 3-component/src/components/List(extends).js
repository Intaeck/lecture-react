import React from 'react';

// 상속 방식 -> 리액트에서는 클래스 상속으로 컴포넌트 재활용하는 것은 권장하지 않음
// KeywordList와 HistoryList의 공통적인 부분을 추출하여 클래스 생성 -> 자식 클래스에서 상속
export default class List extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    }
  }

  // 추상 메서드 -> List 클래스를 상속하는 자식 클래스에서 구현하도록 강제
  renderItem(item, index) {
    throw 'renderItem()을 구현하세요'
  }

  render() {
    return (
      <ul className="list">
        {this.state.data.map((item, index) => {
          // 리액트 엘리먼트 반환
          return (
            // 부모인 App.js에서 받은 props 콜백함수 onClick 실행
            <li key={item.id} onClick={() => this.props.onClick(item.keyword)}>
              {/* 상속한 자식 클래스에서 구현한 renderItem 메서드 실행 */}
              {this.renderItem(item, index)}
            </li>
          )
        })}
      </ul>
    )
  }
}