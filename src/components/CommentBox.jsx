import React, { Component } from 'react'
import commentBoxStyles from '../css/commentBoxStyles.scss';
import utils from '../utils/utils';
import { postFetchComments } from '../repository';
import axios from 'axios';

export default class CommentBox extends React.Component {
    cmments = [];
    constructor(props) {
        super(props);
        this.comments = []
        this.state = {
            showComments: false,
            comments: [],
            loggedInUserObj: {},
            selectedProduct: this.props.selectedProduct,
            averageRating: 0,  
        };


    }
    componentDidMount() {
        this.setState(this.state.loggedInUserObj = utils.checkLoggedInUser());
    }

    /*reloadComments() {
        axios.post(`${BASE_URL}/api/comments`, { selectedProduct: this.props.selectedProduct })
            .then((comments) => {
                console.log(comments.data);
                this.setState({
                    comments: comments.data
                });

            }).catch((error) => {
                console.log(error)
            });
    }*/

    render() {
       // if (this.props.selectedProduct && this.state.comments.length == 0) {
            axios.post(`/api/comments`, { selectedProduct: this.props.selectedProduct })
                .then((comments) => {
                    this.setState({
                        comments: comments.data.comments,
                        averageRating: comments.data.averageRating
                    });
                    this.cmments = this._getComments();

                }).catch((error) => {
                    console.log(error)
                });

        //}
        let commentNodes;
        let buttonText = 'Show Comments';

        if (this.state.showComments) {
            buttonText = 'Hide Comments';
            commentNodes = <div className="comment-list">{this.cmments}</div>;
        }

        return (        
            <div className="comment-box">
                <h2>Comments for :{this.props.selectedProduct.name}</h2>
                <CommentForm addComment={this._addComment.bind(this)} pppddd={this.props.selectedProduct} />
                <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
                    {buttonText}
                </button>
                <h3>Comments</h3>
                <h4 className="comment-count">
               
                {this._getCommentsTitle(this.cmments.length)}
                </h4>
                <span>Average Rating: </span>
                <span>{this.state.averageRating}</span>
                {commentNodes}
            </div>
        );
    } // end render

    _addComment(author, body, rating) {
        let ratingValue = Number(rating)
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body,
            ratingValue
        };
        //this.comments.concat([comment]);
        this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }
   
    _getComments() {
            return this.state.comments.map((comment)=> {    
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
        console.log(typeof event.target.value)
        this.setState({
            selectValue: parseInt(event.target.value)
            
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
                        <textarea class="form-control" placeholder="Comment" rows="4" required onChange={this.txtArC} ref={(textarea) => this._body = textarea}/>
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
                <div></div>
                <div className="comment-form-actions">
                    <button type="submit" class="btn btn-primary" >Post Comment</button>
                </div>
                <div>{this.state.averageRating}</div>
            </form>   
        );
    } // end render

    ///new commeny


    _handleSubmit(event) {
        event.preventDefault();   // prevents page from reloading on submit
        let author = this._author;
        let body = this._body;
        let rating = this.state.selectValue;
        this.props.addComment(author.value, body.value, rating);
        var addCommentObj = new Object();
        addCommentObj.productId = this.props.pppddd._id;
        addCommentObj.author = author.value;
        addCommentObj.body = this.state.comBd;
        addCommentObj.rating = rating
       
        //axios post - start

        axios.post(`/api/commentAdd`, { addCommentObj: addCommentObj })
            .then((comments) => {
                if (comments.data == true) {
                    alert("Your comment added successfully");
                    //this.props.reloadCmtHandler();
                } else {
                    alert("Error occurred");
                }

            }).catch((error) => {
                console.log(error)
            });
        //axios post - end

        return (
            <Comment
                author={author.value}
                body={body.value}
                key=''
                rating={rating}
            />
        );
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
                <div className="comment-footer">
                </div> 
            </div>
        );
    }
    
}
