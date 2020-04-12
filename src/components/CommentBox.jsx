import React, { Component } from 'react'
import commentBoxStyles from '../css/commentBoxStyles.scss';
import utils from '../utils/utils';
import { postFetchComments } from '../repository';
import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export default class CommentBox extends React.Component {
    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: [
                // { productId: "123345", id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick", rating: 1 },
                // { productId: "234234", id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow...", rating: 2 },
                // { productId: "456233", id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?", rating: 3 }
            ],
            loggedInUserObj: {}
        };
    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());

        // postFetchComments(this.props.selectedProduct._id).then((comments) => this.setState({ comments }));

        // axios.post(`${BASE_URL}/api/comments`, { id: productId })
        // .then(response => response.data);

        axios.post(`${BASE_URL}/api/comments`, { selectedProduct: this.props.selectedProduct })
            .then((comments) => {

                console.log(comments.data);
                // if (res.data == true) {
                //     alert('Added to DB successfully');
                // } else {
                //     alert('Error While adding to DB');
                // }

            }).catch((error) => {
                console.log(error)
            });

    }

    render() {
        const comments = this._getComments();
        let commentNodes;
        let buttonText = 'Show Comments';

        if (this.state.showComments) {
            buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{comments}</div>;
        }

        return (
            <div className="comment-box">
                <h2>Comments for :{this.props.selectedProduct.name}</h2>
                <CommentForm addComment={this._addComment.bind(this)} />
                <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                    {buttonText}
                </button>
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {this._getCommentsTitle(comments.length)}
                </h4>
                {commentNodes}
            </div>
        );
    } // end render

    _addComment(author, body, rating) {
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body,
            rating
        };
        this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }

    _getComments() {
        return this.state.comments.map((comment) => {
            return (
                <Comment
                    author={comment.author}
                    body={comment.body}
                    key={comment.id}
                    rating={comment.rating}
                />
            );
        });
    }

    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comments yet';
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }
} // end CommentBox component

class CommentForm extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedInUserObj: {},
            selectValue: 1
        };
    }

    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
    }

    handleChange = (event) => {



        this.setState({
            selectValue: event.target.value
        }, () => {
            console.log("selected value ->" + this.state.selectValue);
        });

    };

    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
                    <input class="form-control" value={this.state.loggedInUserObj.username} disabled required ref={(input) => this._author = input} /><br />
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea} />
                    </div>

                    <div>

                        <div>
                            <select class="form-control" defaultValue={this.state.selectValue} onChange={this.handleChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                        </div>


                    </div>
                </div>
                <br />
                <div className="comment-form-actions">
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </div>
            </form>
        );
    } // end render

    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        let author = this._author;
        let body = this._body;
        let rating = this.state.selectValue;
        this.props.addComment(author.value, body.value, rating.value);
    }
} // end CommentForm component

class Comment extends React.Component {
    render() {
        return (
            <div className="comment">
                <p className="comment-header">{this.props.author}</p>
                <p className="comment-body">- {this.props.body}</p>
                <p className="comment-rating">- {this.props.rating}</p>
                {/* <div className="comment-footer">
                    <a href="#" className="comment-footer-delete" onClick={this._deleteComment}>Delete Comment</a>
                </div> */}
            </div>
        );
    }
    // _deleteComment() {
    //     alert("-- DELETE Comment Functionality COMMING SOON...");
    // }
}



// ReactDOM.render(<CommentBox />, document.getElementById('main'));