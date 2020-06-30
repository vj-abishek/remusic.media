const form = document.querySelector('#form');
const loader = document.querySelector('.determinate');
const loading = document.querySelector('.loading-me');
const text = document.querySelector('#text');
const { thumbnail_photo } = form;
const load = document.querySelector('#loads');
const { video } = form;
const data = {};
let videFile;
let i = 1;
let t;
let UploadedEverything = false;

form.addEventListener('submit', (e) => {
    const { title } = form;
    const { description } = form;
    e.preventDefault();
    data.title = title.value;
    data.description = description.value;

    // TODO:Add to database
    console.log(data);

    // TODO: This is for upload section
    handleFile('thumbnail_photo/', data.thumbnail_photo, 'thumbnail_photo');
});

thumbnail_photo.addEventListener('change', (e) => {
    data.thumbnail_photo = e.target.files[0];
});
video.addEventListener('change', (e) => {
    data.video = e.target.files[0];
    data.type = e.target.files[0].type;
    videFile = e.target.files[0];
    console.log(data);
});

const handleFile = async (path, datas, type) => {
    // FIXME: this is for thumbnail section
    const uploadTask = storageRef.ref(path + datas.name).put(datas);

    // TODO:place to handele upload

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done, type :`, type);
            t = `Now Uploading ${type} (${Math.floor(progress)}%)`;
            text.innerHTML = t;
            loading.style.display = 'block';
            loader.style.width = `${progress}%`;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
            text.innerHTML = 'An error occured :(';
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                type === 'thumbnail_photo'
                    ? (data.thumbnail_photo = downloadURL)
                    : (data.video = downloadURL);
                console.log(data);

                console.log(i);
                if (i === 1) {
                    console.log(i);
                    console.log('Now uploading video....', videFile);
                    handleFile('video_songs/', videFile, 'video');
                    i += 1;
                } else {
                    console.log(i);
                    console.log('Logged out for the function');
                    if ((type = 'video')) {
                        UploadedEverything = true;
                    }
                }

                // add to database
                if (UploadedEverything) {
                    console.log('Uploaded everything 😂😃😄');
                    text.innerHTML = 'Now adding to data to database😄😎🎉';
                    //   load.classList.remove("determinate");

                    load.className = 'indeterminate';
                    data.time = Date.now();
                    data.photoURL = users.photoURL;
                    db.collection('video')
                        .add(data)
                        .then((docRef) => {
                            console.log(docRef.id);
                            const docId = docRef.id;
                            db.collection('video')
                                .doc(docId)
                                .set({
                                    id: docId
                                }, { merge: true })
                                .then(() => {
                                    console.log('Document successfully written!');
                                    window.location = "/";
                                })
                                .catch(err => console.log(err));

                            // window.location.href = 'success.html';
                        })
                        .catch((error) => {
                            console.error('Error writing document: ', error);
                        });
                }
            });
        },
    );
};

// TODO:add to database
