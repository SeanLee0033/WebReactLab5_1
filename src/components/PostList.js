import React, { Component } from 'react'
import axios from 'axios'
import './TableCss.css'
class PostList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                console.log(response)
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    postDelete =  (postId) => {
        axios.delete("https://jsonplaceholder.typicode.com/photos/"+postId)
        .then(response => {
            if(response.data != null) {
                alert("Post deleted");
                this.setState ({
                    posts: this.state.posts.filter(post => post.id != postId)
                });
            }
        });

    }
    render() {
        const { posts } = this.state
        return (

            <div className='table'>
                <h3>List of Alebumn</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Alebumn</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length ?
                                posts.map(post =>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td><img 
                                        src={post.thumbnailUrl} alt="new"
                                        /></td>
                                        <td><button onClick={this.postDelete.bind(this, post.id)}>Delete</button></td>
                                    </tr>
                                ) : null
                        }
                    </tbody>
                    

                </table>
            </div>


        )
    }
}

export default PostList