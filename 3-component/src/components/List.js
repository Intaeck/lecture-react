import React from 'react';

// 조합 방식 - render prop을 받음
// 함수형 컴포넌트
const List = ({data = [], onClick, renderItem}) => {
  // 리액트 엘리먼트 객체 반환
  return (
    <ul className='list'>
      {data.map((item, index) => (
        <li key={item.id} onClick={() => onClick(item.keyword)}>
          {/* 외부에서 리액트 엘리먼트를 반환할 수 있는 함수를 props로 전달받음 - render prop */}
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
};

export default List;



// 클래스 상속 방식
// export class List extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       data: [],
//     };
//   }

//   renderItem(item, index) {
//     throw 'renderItem()을 구현하세요';
//   }

//   render() {
//     const { onClick } = this.props;
//     const { data } = this.state;

//     return (
//       <ul className='list'>
//         {data.map((item, index) => (
//           <li key={item.id} onClick={() => onClick(item.keyword)}>
//             {this.renderItem(item, index)}
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }
