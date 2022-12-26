class PostComment{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        // console.log(this.postId);
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);
    }
    createComment = function(postId){
        
        let self = this;
        // Method to submit form using ajax
        this.newCommentForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: self.newCommentForm.serialize(),
                success: function(data){
                    let newComment = self.newCommentDOM(data.data.comment);
                    let commentContainer = $(`#post-comments-${postId}`);
                    commentContainer.prepend(newComment);
                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
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
                        <small>
                            
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                0 Likes
                            </a>
                            
                        </small>
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