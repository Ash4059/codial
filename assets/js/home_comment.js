class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);
    }
    createComment = function(postId){
        // console.log(newCommentForm);
        // Method to submit form using ajax
        this.newCommentForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: commentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    console.log("comment added");
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // Method to create new comment in DOM
    newCommentDOM = function(comment){
        return `<li>
                    <p>
                        ${ comment.content }
                        <small><a href="/comments/destroy/${ comment._id }">Delete</a></small>
                        <br>
                        <small>${ comment.user.name }</small>
                    </p>
                </li>`;
    }

    // Method to delete a comment from dom
    deleteComment = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
}