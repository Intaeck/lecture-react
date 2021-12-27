import React from 'react';

// 동일한 데이터(searchKeyword)에 여러 컴포넌트가 의존하는 경우는 가장 가까운 부모 컴포넌트로 staet를 끌어올리는 것이 바람직하다 => state 끌어올리기
// 내부 state였던 searchKeyword를 부모인 App.js로 끌어올렸기 때문에 상태관리가 필요없는 함수 컴포넌트로 변경한다
const SearchForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // 부모인 App.js로 부터 전달받은 props의 callback함수를 실행시킨다
    // --> 리액트에서는 props를 통해 부모 -> 자식으로 전달이 자연스럽지만 자식->부모 전달을 위해 콜백함수를 사용한다
    props.onSubmit(props.value);
  }

  const handleReset = () => {
    // 부모인 App.js로 부터 전달받은 props의 callback함수를 실행시킨다
    props.onReset();
  }

  const handleChangeInput = (event) => {
    // 부모인 App.js로 부터 전달받은 props의 callback함수를 실행시킨다
    props.onChange(event.target.value);
  }

  return (
    // form의 onSubmit, onReset 이벤트 발생 시 처리
    <form onSubmit={handleSubmit} onReset={handleReset}>
      {/* input 엘리먼트의 value값 설정 및 발생하는 onChange 이벤트 처리 */}
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        autoFocus
        // state와 input의 value를 연결(binding)
        value={props.value}
        // onChange 이벤트를 연결
        onChange={handleChangeInput}
      />
      {/* reset button */}
      {/* 조건부 렌더링 : &&연산자 사용 -- &&가 true여야만 뒤의 조건을 실행, false면 무시 */}
      {props.value.length > 0 && (
        <button type='reset' className='btn-reset'></button>
      )}
    </form>
  );
}

export default SearchForm;


// state 끌어올리기로 인해 삭제처리
// export default class SearchForm extends React.Component {
//   constructor() {
//     super();

//     // 동일한 데이터(searchKeyword)에 여러 컴포넌트가 의존하는 경우는 가장 가까운 부모 컴포넌트로
//     // staet를 끌어올리는 것이 바람직하다 => state 끌어올리기
//     // this.state = {
//     //   searchKeyword: '',
//     // };
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     // 부모인 App.js로 부터 전달받은 props의 callback함수를 실행시킨다
//     // --> 리액트에서는 props를 통해 부모 -> 자식으로 전달이 자연스럽지만 자식->부모 전달을 위해 콜백함수를 사용한다
//     this.props.onSubmit(this.state.searchKeyword);
//   }

//   handleReset() {
//     // 부모인 App.js로 부터 전달받은 props의 callback함수를 실행시킨다
//     this.props.onReset();
//   }

//   handleChangeInput(event) {
//     const searchKeyword = event.target.value;

//     if (searchKeyword.length <= 0) {
//       this.handleReset();
//     }

//     this.setState({ searchKeyword });
//   }

//   render() {
//     return (
//       // form이 제출 시 발생하는 이벤트 처리
//       <form
//         onSubmit={(event) => this.handleSubmit(event)}
//         onReset={() => this.handleReset()}
//       >
//         <input
//           type='text'
//           placeholder='검색어를 입력하세요'
//           autoFocus
//           // state와 input의 value를 연결(binding)
//           value={this.state.searchKeyword}
//           // onChange 이벤트를 연결
//           onChange={(event) => this.handleChangeInput(event)}
//         />
//         {/* reset button */}
//         {/* 조건부 렌더링 : &&연산자 사용 -- &&가 true여야만 뒤의 조건을 실행, false면 무시 */}
//         {this.state.searchKeyword.length > 0 && (
//           <button type='reset' className='btn-reset'></button>
//         )}
//       </form>
//     );
//   }
// }
