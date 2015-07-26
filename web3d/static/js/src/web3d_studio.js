/* Javascript for Web3dXBlock. */
function Web3dXBlockStudio(runtime, element) {
    $('.save-button', element).on('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

        $.post(handlerUrl, JSON.stringify({
            display_name: $('input#display_name', element).val(),
            obj: $('input#obj', element).val(),
            mtl: $('input#mtl', element).val()
        })).done(function () {
            window.location.reload(false);
        });
    });

    $('.cancel-button', element).on('click', function () {
        runtime.notify('cancel', {});
    });
}