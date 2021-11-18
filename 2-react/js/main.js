//main.js를 만드는 이유
//1. 코드가 많아질 경우를 대비
//2. js코드의 시작점이며, 나머지 코드들은 모듈로 import하기 위함
const element = <h1>Hello world</h1>;
ReactDOM.render(element, document.querySelector('#app'));
