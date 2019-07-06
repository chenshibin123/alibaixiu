$('#file').on('change', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('avatar', file)
    $.ajax({
        type: 'post',//get或post
        url: '/upload',//请求的地址
        data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (result) {//成功的回调函数
            $('#preview').attr('src', result[0].avatar).show()
            $('#hiddenImg').val(result[0].avatar)
        }
    })
})
$('#addForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',//get或post
        url: '/slides',//请求的地址
        data: formData,
        dataType: 'json',
        success: function (result) {//成功的回调函数
            location.reload()
        }
    })
    return false
})

$.ajax({
    type: 'get',//get或post
    url: '/slides',//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
        console.log(result);

        var html = template('slidesTpl', { data: result })
        $('#tbody').html(html)
    }
})
$('#tbody').on('click', '.delete', function () {
    if (confirm('有种炮轰我')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',//get或post
            url: '/slides/' + id,//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })
    }
})