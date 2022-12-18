const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const body = document.body;

const addComments = (comments) => {
    const commentTemplate = bigPicture.querySelector('.social__comment');
    const commentsList = bigPicture.querySelector('.social__comments');
    const fragment = document.createDocumentFragment();
    comments.forEach ((comment) => {
        const commentClone = commentTemplate.cloneNode(true);
        const image = commentClone.querySelector('.social__picture');
        commentClone.querySelector('.social__text').textContent = comment.message;
        image.alt = comment.name;
        image.src = comment.avatar;
        fragment.appendChild(commentClone)
    })
    commentsList.innerHTML = '';
    commentsList.append(fragment);
}


const closePhoto = () => {
    body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', closeEscape)
}

const closeEscape = (evt) => {
    if (evt.key == 'Escape') {
        closePhoto();
    }
}


const openPhoto = (photo) => {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('big-picture__img img').scr = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    addComments(photo.comments);
    closeButton.addEventListener('click', closePhoto);
    document.addEventListener('keydown', closeEscape);
};

export { openPhoto };
