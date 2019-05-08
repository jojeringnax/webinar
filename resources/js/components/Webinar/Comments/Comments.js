import React from 'react';
import axios from 'axios';
import RegComment from './RegComment';
import ResComment from './ResComment';
import CommentForm from './CommentForm';

class Comments extends React.Component{
    render() {
        return (
            <div>
                <CommentForm />

                <RegComment />
            </div>

        );
    }
}


export default Comments;