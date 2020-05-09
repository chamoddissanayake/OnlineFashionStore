import React, { Component } from 'react'
import commentBoxStyles from '../css/commentBoxStyles.scss';
import utils from '../utils/utils';
import { postFetchComments } from '../repository';
import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            comments: [
                // { productId: "123345", id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick", rating: 1 },
                // { productId: "234234", id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow...", rating: 2 },
                // { productId: "456233", id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?", rating: 3 }
            ],
            loggedInUserObj: {},
            selectedProduct: this.props.selectedProduct,
            averageRating: 0
        };
        this.reloadComments = this.reloadComments.bind(this);
    }



    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());


        // postFetchComments(this.props.selectedProduct._id).then((comments) => this.setState({ comments }));

        // axios.post(`${BASE_URL}/api/comments`, { id: productId })
        // .then(response => response.data);
    }

    reloadComments() {
        axios.post(`${BASE_URL}/api/comments`, { selectedProduct: this.props.selectedProduct })
            .then((comments) => {
                console.log(comments.data);
                this.setState({
                    comments: comments.data
                });

            }).catch((error) => {
                console.log(error)
            });
    }

    render() {

        if (this.props.selectedProduct && this.state.comments.length == 0) {
            axios.post(`${BASE_URL}/api/comments`, { selectedProduct: this.props.selectedProduct })
                .then((comments) => {

                    console.log(comments.data);

                    // var arr = [];
                    // Object.keys(comments.data).forEach(function (key) {
                    //     arr.push(comments.data[key]);
                    // });
                    // console.log("-------")
                    // console.log(arr);

                    this.setState({
                        comments: comments.data.comments,
                        averageRating: comments.data.averageRating
                    });


                }).catch((error) => {
                    console.log(error)
                });

        }


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
                <CommentForm addComment={this._addComment.bind(this)} pppddd={this.props.selectedProduct} reloadCmtHandler={this.reloadComments} />
                <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                    {buttonText}
                </button>
                <h3>Comments</h3>
                <h4 className="comment-count">
                    {this._getCommentsTitle(comments.length)}
                </h4>
                <span>Average Rating: </span>
                <span>{this.state.averageRating}</span>
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
            selectValue: 1,
            comBd: ''
        };
        this.txtArC = this.txtArC.bind(this);
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

    txtArC(e) {
        // this.setState(this.state. = e.target.value);
        this.setState({ comBd: e.target.value });

    }

    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <div className="comment-form-fields">
                    <input class="form-control" value={this.state.loggedInUserObj.username} disabled required ref={(input) => this._author = input} /><br />
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Comment" rows="4" required onChange={this.txtArC} />
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
                <div>ffffffffffffffff</div>
                <div className="comment-form-actions">
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </div>
                <div>dgdfgdf{this.state.averageRating}</div>
            </form>
        );
    } // end render

    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        let author = this._author;
        let body = this._body;
        let rating = this.state.selectValue;
        console.log('------------------');
        console.log(author.value);
        console.log(this.state.comBd);
        console.log(rating);
        console.log(this.props.pppddd._id);
        console.log('------------------');

        var addCommentObj = new Object();
        addCommentObj.productId = this.props.pppddd._id;
        addCommentObj.author = author.value;
        addCommentObj.body = this.state.comBd;
        addCommentObj.rating = rating

        //axios post - start

        axios.post(`${BASE_URL}/api/commentAdd`, { addCommentObj: addCommentObj })
            .then((comments) => {

                console.log(comments.data);
                if (comments.data == true) {
                    alert("Your comment added successfully");
                    this.props.reloadCmtHandler();

                } else {
                    alert("Error occurred");
                }

            }).catch((error) => {
                console.log(error)
            });
        //axios post - end




        // this.props.addComment(author.value, body.value, rating);
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