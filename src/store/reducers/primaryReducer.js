const init = {
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/music-forest-abigo.appspot.com/o/thumbnail_photo%2FPosterMaker_15052020_154545.png?alt=media&token=552628bc-b71c-43d4-954b-7a937c5db524',
    profile: 'https://lh3.googleusercontent.com/a-/AOh14Gg04wX4fIl8ANF5Ni580t5CNPffSAFW7SN1sqWP-Q',
    title: 'Ummai Pola Yarundu',
};

const primaryReducer = (state = init, action) => {
    switch (action.type) {
        case 'FETCH_VIDEOS': {
            const original = action.data;
            const one = original.find((_, i) => i === 0);
            const recent = {
                id: one.id,
                ...one.data(),
            };
            const rest = original.filter((_, i) => i > 0);
            return {
                data: rest,
                recent,
                original,
                ...state,
            };
        }
        case 'GET_VIDEO': {
            return {
                ...state,
                original: [action.data],
            };
        }
        default:
            return state;
    }
};

export default primaryReducer;
