import React, { useState, useEffect } from "react";
import { returnUser, logout } from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchCategories } from "../../utils/categories";
import { fetchGames } from "../../utils/games";


type Category = {
    id: number;
    name: string;
}

type Game = {
    code: string;
    description: string;
    icon: string;
    name: string;
    categoryIds: Array<number>;
}

const Dashboard: React.FC = () => {
    const [gameList, updateGameList] = useState<Game[]>([]);
    const [searchInput, updateSearchInput] = useState<string>('');
    const [selectedCategory, updateSelectedCategory] = useState<number>(0);

    const { data } = useQuery('categories', fetchCategories);
    const { data: games } = useQuery('games', fetchGames);
    const user = returnUser();
    const history = useHistory();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(logout, {
        onSuccess: () => {
            history.push("/");
        },
        onError: error => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.log(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries('create');
        }
    });
    const logoutUser = () => {
        mutate(user.player.username);
        history.push('/login');
    }

    useEffect(() => {
        if (games && games.length > 0 && gameList.length === 0 && !searchInput) {
            updateGameList(games);
        }
    }, [games, gameList, updateGameList, searchInput]);

    const updateGameListCatSelection = (catId: number) => {
        const newGames: Game[] = [];
        for (const game of games) {
            if (game.categoryIds.includes(catId)) {
                newGames.push(game)
            }
        };
        updateGameList(newGames);
        updateSelectedCategory(catId);
    }
    const updateGameListSearch = (value: string) => {
        let newGames: Game[] = [];
        if (value) {
            for (const game of gameList) {
                if (game.name.toLowerCase().includes(value.toLowerCase())) {
                    newGames.push(game)
                }
            };
            updateGameList(newGames);
        } else {
            updateGameListCatSelection(selectedCategory);
        }
        updateSearchInput(value);
    }
    const playGame = (game: string) => {
        localStorage.setItem('selectedGame', game);
        history.push("/game");
    }
    return (
        <div className="casino">
        <div className="ui grid stackable dashboard-header">
            <div className="twelve wide column">
                <div className="ui list">
                    <div className="player item">
                        <img className="ui avatar image" src={user?.player?.avatar} alt="avatar" />

                        <div className="content">
                            <div className="header"><b className="name">{user?.player?.name}</b></div>
                            <div className="description event">{user?.player?.event}</div>
                        </div>
                    </div>
                </div>
                <div className="logout ui left floated secondary button inverted" onClick={logoutUser}>
					<i className="left chevron icon"></i>Log Out
				</div>
            </div>
            <div className="four wide column">
                <div className="search ui small icon input ">
                    <input type="text" placeholder="Search Game" value={searchInput} onChange={(e) => updateGameListSearch(e.target.value)}/>
                    <i className="search icon"></i>
                </div>
            </div>
        </div>
        <div className="ui grid stackable">
            <div className="twelve wide column">
                <h3 className="ui dividing header">Games</h3>
                <div className="ui relaxed divided game items links">
                    {gameList && gameList.length > 0 && gameList.map((game: Game) => {
                        return (
                            <div className="game item" key={game.code}>
                                <div className="ui small image">
                                    <img src={game.icon} alt="game-icon" />
                                </div>
                                <div className="content">
                                    <div className="header"><b className="name">{game.name}</b></div>
                                    <div className="description">
                                        {game.description}
                                    </div>
                                    <div className="extra">
                                        <div className="play ui right floated secondary button inverted" onClick={() => playGame(game.code)}>
                                            Play
                                            <i className="right chevron icon"></i>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="four wide column">
                <h3 className="ui dividing header">Categories</h3>

                <div className="ui selection animated list category items">
                    { data && data.length > 0 && data.map((category: Category) => {
                        return (
                            <div className="category item" key={category.id} onClick={() => updateGameListCatSelection(category.id)}>
                                <div className="content">
                                    <div className="header">{category.name}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    </div>
    )
};
export default Dashboard;