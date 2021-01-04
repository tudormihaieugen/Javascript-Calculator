function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const elements = [
{
  name: 'clear',
  text: 'AC'
},
{
  name: 'divide',
  text: '/'
},
{
  name: 'multiply',
  text: '*'
},
{
  name: 'seven',
  text: '7'
},
{
  name: 'eight',
  text: '8'
},
{
  name: 'nine',
  text: '9'
},
{
  name: 'subtract',
  text: '-'
},
{
  name: 'four',
  text: '4'
},
{
  name: 'five',
  text: '5'
},
{
  name: 'six',
  text: '6'
},
{
  name: 'add',
  text: '+'
},
{
  name: 'one',
  text: '1'
},
{
  name: 'two',
  text: '2'
},
{
  name: 'three',
  text: '3'
},
{
  name: 'zero',
  text: '0'
},
{
  name: 'decimal',
  text: '.'
},
{
  name: 'equals',
  text: '='
}];

const endsWidthOpRegex = /[+|*|\-\/]+$/; //ends width any operator
const endsWidthSelOpRegex = /[+|\-]$/; //ends width add or subtract

class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "inputNumber",

    number => {
      const { currentValue, accValue } = this.state;

      if (currentValue === '0' || accValue.includes('=')) {
        this.setState({
          currentValue: number,
          accValue: number });
        return;
      }

      this.setState(state => ({
        currentValue: state.currentValue += number,
        accValue: state.accValue += number }));

    });_defineProperty(this, "handleOperators",

    operator => {
      const { accValue, currentValue } = this.state;
      const accValueOne = accValue.replace(endsWidthOpRegex, '');
      const accValueTwo = accValue.replace(endsWidthSelOpRegex, '');
      const equalsIdx = accValue.indexOf('=');
      const resultValue = accValue.slice(equalsIdx + 1);

      if (accValue.includes('=')) {
        this.setState(state => ({
          currentValue: operator,
          accValue: resultValue + operator }));

      } else if (operator !== '-') {
        this.setState(state => ({
          currentValue: operator,
          accValue: accValueOne + operator }));

      } else {
        this.setState({
          currentValue: operator,
          accValue: accValueTwo + operator });

      }
    });_defineProperty(this, "getResult",

    () => {
      const { accValue } = this.state;
      const accValueOne = accValue.replace(endsWidthOpRegex, '');
      const result = eval(accValueOne);
      const resultRounded = Math.floor(result * 100000) / 100000;

      this.setState({
        currentValue: resultRounded,
        accValue: accValue + '=' + resultRounded });

    });_defineProperty(this, "clearAll",

    () => {

      this.setState({
        currentValue: '0',
        upperValue: '',
        accValue: '' });

    });this.state = { currentValue: '0', upperValue: '', accValue: '' };this.handleClick = this.handleClick.bind(this);}handleClick(event) {const keyValue = event.target.innerText;const { currentValue, accValue } = this.state;const zeroCondition = keyValue == '0' && currentValue === '0';const dotCondition = keyValue == '.' && currentValue.includes('.');const dotAndOperCondition = keyValue == '.' && endsWidthOpRegex.test(currentValue);const lengthCondition = currentValue.length >= 15;switch (keyValue) {case 'AC':{this.clearAll();return;}case '/':case '*':case '-':case '+':{if (accValue.endsWith('.') || currentValue === '0') {return;} else this.handleOperators(keyValue);return;}case '=':{if (accValue === '') {return;}this.getResult();return;}default:{if (lengthCondition || zeroCondition || dotCondition || dotAndOperCondition) {return;} else this.inputNumber(keyValue);}return;}}

  render() {
    const { currentValue, upperValue, accValue } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement("div", { className: "calc-display", id: "main-display" }, /*#__PURE__*/
      React.createElement("div", { className: "upper-display" },
      accValue), /*#__PURE__*/

      React.createElement("div", { className: "display", id: "display" },
      currentValue)), /*#__PURE__*/

      React.createElement("div", { className: "calc-board" },
      elements.map((item, idx) => /*#__PURE__*/
      React.createElement(Keypad, { key: idx, content: item.text, ident: item.name, handleClick: this.handleClick })))));
  }}

class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { content, ident, handleClick } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { className: "button", type: "button", id: ident, onClick: handleClick },
      content));
  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));
