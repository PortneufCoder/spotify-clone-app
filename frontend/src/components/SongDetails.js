import React, {Component} from 'react';
import './SongDetails.css'

class SongDetails extends Component {
    render() {
        let songId = this.props.match.params.songId;

        return (

            <div>
                <div>
                    <h1><em> What about the song you're hearing... Its dope right?</em></h1>
                    <h2><em>{this.props.songs[songId].title}</em></h2>
                    <h3 className="description"><em>{this.props.songs[songId].description}</em></h3>
                    

                    <button className='btn btn-info text-center' onClick={() => this.props.playSong(this.props.songs[songId].id)}>
                Play this song</button>
                    </div>
            </div>
        )
    }
}

export default SongDetails;