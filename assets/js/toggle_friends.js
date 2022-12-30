
class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriends();
    }


    toggleFriends(){
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
                    
                }else{
                    friendStatus = "add";
                }
                $(self).html(`${friendStatus} friends`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        });
    }
}
