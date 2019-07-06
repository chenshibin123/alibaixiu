$.ajax({
    type: 'get',//get或post
    url: '/categories',//请求的地址

    success: function (result) {//成功的回调函数
        var html = template('categoryTpl', { data: result })
        $('#tbody').html(html)
    }
})
$('#addCategory').on('submit', function () {
    var formDate = $(this).serialize()
    $.ajax({
        type: 'post',//get或post
        url: '/categories',//请求的地址
        data: formDate,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            location.reload()
        }
    })


    return false
})
$('#tbody').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',//get或post
        url: '/categories/' + id,//请求的地址
        data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函数
            var html = template('modifyTpl', result)
            $('#modify').html(html)
        }
    })
})

$('#modify').on('submit', '#modifyCategory', function () {
    var id = $(this).attr('data-id')
    var formDate = $(this).serialize()
    $.ajax({
        type: 'put',//get或post
        url: '/categories/' + id,//请求的地址
        data: formDate,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) {//成功的回调函

            location.reload()
        }
    })
    return false
})
$('#tbody').on('click', '#delete', function () {
    var id = $(this).siblings('.edit').attr('data-id')
    if (confirm('你确定要这么干？')) {
        $.ajax({
            type: 'delete',//get或post
            url: '/categories/' + id,//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })
    }
})