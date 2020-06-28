const init = {
    is_podcast: false,
    is_playing: false,
    clickMusic: false,
    is_buffering: true,
};
const style = (state = init, action) => {
    switch (action.type) {
        case 'IS_PODACST':
            console.log(action.is_podcast);
            return {
                ...state,
                is_podcast: action.is_podcast,
            };
        case 'MUSIC_PLAYER':
            console.log(action.musicJson);
            return {
                ...state,
                clickMusic: true,
                player_json: action.musicJson,
            };
        case 'PlaynPause':
            return {
                ...state,
                is_playing: action.bool,
            };
        case 'SET_PLAYER_REF':
            return {
                ...state,
                PlayerRef: action.ref,
            };
        case 'SHOW_PLAYER':
            return {
                ...state,
                showMainPlayer: action.boolean,
            };

        case 'IS_BUFFERING':
            return {
                ...state,
                is_buffering: false,
            }
        default:
            return state;
    }
};

export default style;
