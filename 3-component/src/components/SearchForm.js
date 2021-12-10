import React from "react";

// state관리를 부모인 App.js로 넘겼으므로 state 관리가 필요없는 함수형 컴포넌트로 변경
// props를 App.js로 부터 받음
const SearchForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // props로 전달된 onSubmit 함수 호출
    props.onSubmit();
  };

  const handleReset = () => {
    props.onReset();
  };

  const handleChangeInput = (event) => {
    props.onChange(event.target.value);
  };

  // 함수형 컴포넌트는 리엑트 엘리먼트를 반환해야함
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        autoFocus
        value={props.value}
        onChange={handleChangeInput}
      />
      {props.value.length > 0 && <button type='reset' className='btn-reset' />}
    </form>
  );
};

export default SearchForm;

// export default class SearchForm extends React.Component {
//   constructor() {
//     super();

//     // 부모인 App.js로 state 위임
//     // this.state = { searchKeyword: "" };
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.onSubmit(this.state.searchKeyword);
//   }

//   handleReset() {
//     this.props.onReset();
//   }

//   handleChangeInput(event) {
//     const searchKeyword = event.target.value;

//     if (searchKeyword.length <= 0) {
//       return this.handleReset();
//     }

//     this.setState({ searchKeyword });
//   }

//   render() {
//     const { searchKeyword } = this.state;

//     return (
//       <form
//         onSubmit={(event) => this.handleSubmit(event)}
//         onReset={() => this.handleReset()}
//       >
//         <input
//           type="text"
//           placeholder="검색어를 입력하세요"
//           autoFocus
//           value={searchKeyword}
//           onChange={(event) => this.handleChangeInput(event)}
//         />
//         {searchKeyword.length > 0 && (
//           <button type="reset" className="btn-reset" />
//         )}
//       </form>
//     );
//   }
// }
