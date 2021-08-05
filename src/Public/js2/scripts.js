$(function () {
    $('#post-comment').hide
    $('#btn-toggle-comment').on('click', function () {
        $('#post-comment').slideToggle();
    });

    $('#btn-like').on('click', function () {
        let imgId = $(this).data('id')
    
    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes)
        });
    })

    $('#btn-delete').on('click', function () {
        let $this = $(this);
        const response = confirm('Are u sure u want to delete this image');
        if (response) {
            let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function (result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
        });
        }
    });
});