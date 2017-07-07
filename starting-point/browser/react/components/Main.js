import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import axios from "axios";
import SinglePlaylist from "./SinglePlaylist";

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      allPlaylists: []
    }
    this.updatePlaylists = this.updatePlaylists.bind(this);
  }
  componentDidMount(){
    axios.get('/api/playlists')
    .then(res => res.data)
    .then(playlists => this.setState({allPlaylists: playlists}))
  }

  updatePlaylists(playlistName){
    axios.post("/api/playlists/", {
        name: playlistName
    })
    .then(res => res.data)
    .then(playlist => this.setState({allPlaylists: [...this.state.allPlaylists, playlist]}))
  }


  render () {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists = {this.state.allPlaylists}/>
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route exact path ="/new-playlist" render = {() => <NewPlaylist submit = {this.updatePlaylists } />} />
              <Route path="/playlists/:playlistId" component={SinglePlaylist} />
              <Route component={StatefulAlbums} />
            </Switch>

          </div>
          <Player />
        </div>

    </Router>
    );
  }
}
