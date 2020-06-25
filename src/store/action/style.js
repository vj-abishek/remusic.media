export const get = (cond) => (dispatch, state) => {
    if (cond) {
        dispatch({ type: 'IS_PODACST', is_podcast: true });
    } else {
        dispatch({ type: 'IS_PODACST', is_podcast: false });
    }
};

export const Music = (musicJson) => (dispatch, state) => {
    console.log('Got in the Action', musicJson);
    dispatch({ type: 'MUSIC_PLAYER', musicJson });
};

export const PlaynPause = (bool) => (dispatch, state) => {
    console.log('Playing:', bool);
    dispatch({ type: 'PlaynPause', bool });
};

export const SetPlayerRef = (ref) => (dispatch) => {
    dispatch({ type: 'SET_PLAYER_REF', ref });
};

export const showPlayer = (boolean) => (dispatch) => {
    dispatch({ type: 'SHOW_PLAYER', boolean });
}
