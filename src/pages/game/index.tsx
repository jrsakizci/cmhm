import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

declare global {
    interface Window { comeon: any; }
}

window.comeon = window.comeon || {};

const Game: React.FC = () => {
    const history = useHistory();
    useEffect(() => {
        const selectedGame = localStorage.getItem('selectedGame');
        if (!selectedGame) history.push('/');
        window.comeon.game.launch(selectedGame?.toLowerCase());
    }, [history]);
    return (
    <div className="ingame">
        <div className="ui grid stackable centered">
            <div className="three wide column">
                <div className="ui right floated secondary button inverted" onClick={() => history.push('/')}><i className="left chevron icon"></i>Back
                </div>
            </div>
            <div className="ten wide column">
                <div id="game-launch">
                </div>
            </div>
            <div className="three wide column"></div>
        </div>
    </div>
    )
};

export default Game;