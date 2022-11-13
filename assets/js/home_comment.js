{
    let createComment = function(){
        let newCommentForms = $(".new-comment-form");
        // console.log(newCommentForm);
        // Method to submit form using ajax
        for(let commentForm of newCommentForms){
            console.log(commentForm);
            commentForm.submit(function(event){
                event.preventDefault();
                $.ajax({
                    type: "post",
                    url: "/comments/create",
                    data: commentForm.serialize(),
                    success: function(data){
                        let newComment = newCommentDOM(data.data.comment);
                        $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                        console.log("comment added");
                    },error: function(error){
                        console.log(error.responseText);
                    }
                })
            });
        }
    }

    // Method to create new comment in DOM
    let newCommentDOM = function(comment){
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
    let deleteComment = function(deleteLink){
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

    // createComment();
}