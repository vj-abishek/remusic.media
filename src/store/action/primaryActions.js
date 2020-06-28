import firebase from '../../config/fb';
import 'firebase/firestore';

export const primary = () => (dispatch, state) => {
    console.log('THe State', state());
    const db = firebase.firestore();
    const docRef = db.collection('video').orderBy('time', 'desc');
    docRef.get().then((doc) => {
        dispatch({ type: 'FETCH_VIDEOS', data: doc.docs });
    }).catch((error) => {
        console.log('Error getting cached document:', error);
        dispatch({ type: 'FETCH_ERROR', error })
    });
};

export const getById = (id) => (dispatch) => {
    const db = firebase.firestore();
    const docRef = db.collection('video').doc(id);
    docRef.get().then((data) => {
        // console.log('Getting video by id:', data.data());
        dispatch({ type: 'GET_VIDEO', data });
    })
        .catch((err) => console.error(err));
};
