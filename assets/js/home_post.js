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
                    console.log(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    
                    // To delete the post
                    deletePost($(' .delete-post-button', newPost));

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    // Call the create comment class
                    new PostComment(data.data.post._id);

                    new Noty
                    ({
                        theme: 'relax',
                        text: 'Post published',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
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
                        <br>
                        <small>
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
                        </small>
                    </p>
                    <div class="posts-comments">
                        <form action="/comments/create" method="post" id="post-${post._id}-comments-form">
                            <input type="text" name="content" placeholder="Type here to add comments...." required>
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Add comments">
                        </form>
                        <div class="post-comment-list">
                            <ul id="post-comments-${ post._id }">
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