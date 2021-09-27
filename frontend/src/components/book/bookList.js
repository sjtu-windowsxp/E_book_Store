import React from 'react';
import {Input, List} from 'antd';
import {Book} from './book';
import {getBooks} from "../../services/bookService";

const {Search} = Input;

export class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            showBooks: [],
            searchValue: '',
            page: 1,
            pageSize: 12,
            totalBookNumber: 0
        };
    }

    componentDidMount() {
        const callback = (response) => {
            this.setState({
                books: response.data.content,
                showBooks: response.data.content,
                totalBookNumber: response.data.size
            });
        };
        getBooks({page: this.state.page - 1, pageSize: this.state.pageSize}, callback);
    }

    fetchBooks = (page) => {
        const callback = (response) => {
            this.setState({
                books: response.data.content,
                showBooks: response.data.content,
            });
        };
        this.setState({
            page: page
        });
        getBooks({page: page - 1, pageSize: this.state.pageSize}, callback);
    }

    searchChange = ({target: {value}}) => {

        this.setState({searchValue: value})
        let arr = [];
        let list = this.state.books;
        let search = value.toLowerCase();

        for (let i = 0; i < list.length; i++) {
            if (
                list[i].name.toLowerCase().indexOf(search) >= 0
            ) {
                arr.push(list[i]);
            }
        }
        this.setState(
            {showBooks: arr}
        );
    }

    render() {
        return (
            <div className="bookListContainer">
                <Search value={this.state.searchValue} placeholder="search for book" onChange={this.searchChange}
                        enterButton
                />
                <br/>
                <br/>
                <br/>
                <List
                    grid={{gutter: 10, column: 4}}
                    dataSource={this.state.showBooks}
                    pagination={{
                        position: "bottom",
                        current: this.state.page,
                        pageSize: this.state.pageSize,
                        total: this.state.totalBookNumber,
                        onChange: this.fetchBooks
                    }}
                    renderItem={item => (
                        <List.Item style={{border: "none"}}>
                            <Book info={item}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}