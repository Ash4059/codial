{
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        
        // Method to submit the form using ajax
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
                    <p>
                        ${ post.content }
                        <small><a class="delete-post-button" href="/posts/destroy/${ post._id }">Delete</a></small>
                        <br>
                        ${ post.user.name }
                    </p>
                    <div class="posts-comments">
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="Type here to add comments...." required>
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Add comments">
                        </form>
                        <div class="post-comment-list">
                            <ul id="post-comments-${ post.id }">
                            </ul>
                        </div>
                    </div>
                </li>`);
    }

    // Method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createPost();
}