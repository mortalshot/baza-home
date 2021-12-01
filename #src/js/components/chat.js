let chat = $('.chat');

if (chat) {
    $(".chat__window").scrollTop(function () {
        return this.scrollHeight;
    });
}