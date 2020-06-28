const init = {
    loading: true,
    error: false,
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
                ...state,
                data: rest,
                recent,
                original,
                loading: false,
            };
        }
        case 'GET_VIDEO': {
            return {
                ...state,
                original: [action.data],
            };
        }
        case 'FETCH_ERROR':
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};

export default primaryReducer;
