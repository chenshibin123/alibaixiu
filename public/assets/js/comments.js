var page = 1
render(page)

function changePage(currentPage) {
    var page = currentPage
    render(page)
}
function render(page) {
    $.ajax({
        type: 'get',//get或post
        url: '/comments',//请求的地址
        data: { page: page },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            var html = template('commentTpl', result)
            $('#tbody').html(html)
            var page = template('pageTpl', result)
            $('#page').html(page)
        }
    })
}

//
$('#tbody').on('click', '.status', function () {
    var id = $(this).attr('data-id')
    var state = $(this).attr('data-status')
    $.ajax({
        type: 'put',//get或post
        url: '/comments/' + id,//请求的地址
        data: { state: state == 0 ? 1 : 0 },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            location.reload()
        }
    })
})

$('#tbody').on('click', '.delete', function () {
    if (confirm('你真想杀我了吗？')) {
        var id = $(this).siblings('.status').attr('data-id')
        $.ajax({
            type: 'delete',//get或post
            url: '/comments/' + id,//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })
    }
})