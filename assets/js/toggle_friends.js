
class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriends();
    }


    toggleFriends(){
        const pSelf = this;
        $(this.toggler).click(function(e){
            e.preventDefault();
            const self = this;
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let friendStatus;
                if (data.data.isFriend){
                    friendStatus = "remove";
                    $(".users-friends").append(pSelf.newFriendDom(data.data.friend));
                }else{
                    friendStatus = "add";
                    $(`#users-friend-${data.data.friend.id}`).remove();
                }
                $(self).html(`${friendStatus} friends`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        });
    }

    newFriendDom = function(friendData){
        return `
            <p id="users-friend-${friendData.id}">
                <a href="/users/profile/${friendData.id}">${friendData.name}</a>
            </p>`
    }

}
