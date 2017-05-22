console.log('subscription')
$('body').on('keydown', (e) => {
    if (e.altKey) {
        switch (e.which) {
            case 72:
                $('.header').toggleClass('blur')
                break;
            case 85:
                $('.user-list-and-search').toggleClass('blur')
                break;
            case 77:
                $('.message-list-and-input').toggleClass('blur')
                break;            
            default:
                break;
        }
    }
})
