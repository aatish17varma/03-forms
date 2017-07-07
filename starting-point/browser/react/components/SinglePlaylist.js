import React, { Component } from 'react';
import axios from 'axios';
import Songs from '../components/Songs';

export default class SinglePlaylist extends Component {

  constructor () {
    super();
    this.state = {
      playlist: {}
    };
  }

  componentDidMount () {
    const playlistID = this.props.match.params.playlistId;
    axios.get(`/api/playlists/${playlistID}`)
      .then(res => res.data)
      .then(playlist => this.setState({
        playlist
      }));
  }

  render () {
    return (
     <div>
     <h3>{ this.state.playlist.name }</h3>
       <Songs songs={this.state.playlist.songs} /> {/** Hooray for reusability! */}
        { this.state.playlist.songs && !this.state.playlist.songs.length && <small>No songs.</small> }
     <hr />
    </div>
    );
  }
}
