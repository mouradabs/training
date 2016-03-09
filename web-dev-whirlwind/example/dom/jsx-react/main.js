var React = require('react')
var render = require('react-dom').render

class App extends React.Component {
  constructor () {
    super()
    this.state = { times: 0 }
  }
  render () {
    return <div>
      <h1>clicked {this.state.times} times</h1>
      <div>
        <button onClick={this.handleClick.bind(this)}>click me!</button>
      </div>
    </div>
  }
  handleClick () {
    this.setState({ times: this.state.times + 1 })
  }
}
render(<App />, document.querySelector('#content'))
