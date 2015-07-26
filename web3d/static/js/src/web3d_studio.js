/* Javascript for Web3dXBlock. */
function Web3dXBlockStudio(runtime, element) {
    $(function ($) {
        $('.save-button', element).on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

            $.post(handlerUrl, JSON.stringify({
                obj: $('input#obj', element).val(),
                mtl: $('input#mtl', element).val()
            })).done(function (response) {
                window.location.reload(false);
            });
        });
    });
}