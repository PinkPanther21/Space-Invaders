 document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get the values from the form
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Create a new comment element
    const newComment = document.createElement('div');
    newComment.classList.add('comment');

    const commentHeader = document.createElement('h3');
    commentHeader.textContent = name;
    newComment.appendChild(commentHeader);

    const commentText = document.createElement('p');
    commentText.textContent = comment;
    newComment.appendChild(commentText);

    // Add the new comment to the list
    document.getElementById('commentsList').appendChild(newComment);

    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});