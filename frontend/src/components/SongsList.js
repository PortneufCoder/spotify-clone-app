import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SongsList extends Component {
    
    
    render() {
        let moveHere = Array.from(this.props.songs)
        let JSX = moveHere.map((songs, index) => {
            return (
                <div>
                    <div>
                        <h3 className="songTitle"><Link to={'/' + songs.id}>{songs.title}</Link></h3>
                       
                <button id="playButton" className='btn btn-info' onClick={() => this.props.playSong(index)}>PLAY</button>
                    </div>
                </div>
            )
        })
        
       
       



        return (
            <div>

                {JSX}
                
            </div>
        )
    }
}

export default SongsList;