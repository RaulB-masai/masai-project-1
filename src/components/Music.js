import React from "react";
import axios from "axios";
import Nav from "./Nav";

export default class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: []
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=27&regionCode=in&videoCategoryId=10&key=AIzaSyCYnz2BIh3II4v9LlDizrr6F2aj7LVCAU0"
        })
            .then((response) => {
                console.log(response.data)
                console.log(response.data.items[0].snippet.title)
                this.setState({
                    collections: [...response.data.items],
                });
            })
    }
    render() {
        console.log(this.state.collections)
        return (
            <div>
                <Nav/>
           
            <div style={{marginTop:"100px"}}>
                <h1 className="display-3 text-info text-center"style={{fontFamily:'Roboto Mono'}}>Trending Music Videos</h1>
                <div className="container-fluid">
                    <div className="row">
                        {this.state.collections.map((item) => {
                            return (
                                <div class="card shadow-lg col-lg-4 col-sm-5 mt-2">
                                    <iframe height="350px" src={"https://www.youtube.com/embed/" + item.id} frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    <div class="card-body">
                                        <h4 style={{ fontFamily: "Ropa Sans, sans-serif" }} class="card-title">{item.snippet.title}</h4>
                                        <h5 style={{ fontFamily: "Ropa Sans, sans-serif" }}>Views:{item.statistics.viewCount}</h5>
                                        <h5 style={{ fontFamily: "Ropa Sans, sans-serif" }}>Likes:{item.statistics.likeCount}</h5>
                                        <h5 style={{ fontFamily: "Ropa Sans, sans-serif" }}>No of Comments:{item.statistics.commentCount}</h5>
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
