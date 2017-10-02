import React , {Component} from 'react';

export default class App extends Component{
    constructor() {
        super();
        this.state = {
          value: 0,
        };
    }
    handleClick(){
        this.setState({value: this.state.value+1})
    }
    render(){
        return (
            <div>
                <h1 style={styles} onClick={ this.handleClick.bind(this) }>Hello world! { this.state.value }</h1>
            </div>
        )
    }
}

const styles = {
    backgroundColor:'green'
}