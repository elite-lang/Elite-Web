"use strict";
import * as React from 'react';
var ReactDOM = require('react-dom');
var Datepicker = require('antd/lib/datepicker');
var Row = require('antd/lib/row');
var Col = require('antd/lib/col');
var QueueAnim = require('antd/lib/queue-anim');

interface AppData {
    nowPage    : number;
    code_data  : string;
    lex_cfg    : string;
    parser_cfg : string;
}

class MainPage extends React.Component<any, AppData> {
    private id: string;
    constructor(id: string) {
        super()
        this.id = id
        this.state = {nowPage: 1, code_data: ''} as AppData;
        this.onMenuChange = this.onMenuChange.bind(this)
    }
    PageRender() {
        ReactDOM.render(
            <MainPage />,
            document.getElementById(this.id)
        )
    }
    onMenuChange(e: string) {
        this.setState({nowPage: +e} as AppData) // 神奇的string转number的写法
    }

    render() {
        return <div className="container">
                <Row>
                    <h1>Elite Language</h1>
                </Row>
            </div>
    }
}

window.onload = function() {
    let main = new MainPage('main_page')
    main.PageRender()
}
