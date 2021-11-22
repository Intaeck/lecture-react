//index.html에서 react를 cdn으로 가져왔기 때문에 전역으로 React 가 존재함
class App extends React.Component {
  // render 메서드는 React element를 반환해야함
  render() {
    return (
      // 2개 이상의 root element(<header>,<div conainer>가 올 수 없으므로
      // <></>로 전체를 감싸주는데 이것을 fragment라고 하며 실제 DOM에는 반영되지 않음
      <>
        <header>
          {/* JSX는 camelcase를 사용함. 
          JSX는 javascript이기 때문에 class는 javascript의 예약어이므로 className으로 사용 */}
          <h2 className='container'>검색</h2>
        </header>
        <div className='container'>
          <form>
            <input type='text' placeholder='검색어를 입력하세요' autoFocus />
            <button type='reset' className='btn-reset'></button>
          </form>
        </div>
      </>
    );
  }
}

// 코드가 여러줄인 경우 소괄호로 묶어줌 -> js engine이 자동으로 태그 뒤에 ; 을 넣는것을 피하기 위함
// jsx에서 많이 사용함
// const element = (
//   // 2개 이상의 root element(<header>,<div conainer>가 올 수 없으므로
//   // <></>로 전체를 감싸주는데 이것을 fragment라고 하며 실제 DOM에는 반영되지 않음
//   <>
//     <header>
//       {/* JSX는 camelcase를 사용함. 
//           JSX는 javascript이기 때문에 class는 javascript의 예약어이므로 className으로 사용 */}
//       <h2 className='container'>검색</h2>
//     </header>
//     <div className='container'>
//       <form>
//         <input type='text' placeholder='검색어를 입력하세요' autoFocus />
//         <button type='reset' className='btn-reset'></button>
//       </form>
//     </div>
//   </>
// );

// ReactDOM.render(element, document.querySelector("#app"));

// render에서 반환하는 <App /> react element객체를 넘겨줌
ReactDOM.render(<App />, document.querySelector('#app'));
