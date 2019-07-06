var page = 1
render(page)
// 渲染文章页面函数

function render(page) {
    $.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        data: { page: page }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
            var html = template('articleTpl', {
                data: result
            })
            $('#tbody').html(html);
            var page = template('pageTpl', result)
            $('#page').html(page)
        }
    });
}

// 点击跳转页面函数
function changePage(currentPage) {
    var page = currentPage
    render(page)
}

// 渲染筛选的分类的数据
$.ajax({
    type: 'get',//get或post
    url: '/categories',//请求的地址
    data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
        console.log(result)
        var html = template('categoryTpl', { data: result })
        $('#categoryBox').html(html)
    }
})

// 筛选渲染分类数据
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
            var html = template('articleTpl', {
                data: result
            })
            $('#tbody').html(html);
            var page = template('pageTpl', result)
            $('#page').html(page)
        }
    });
    return false
})

// 删除文章
$('#tbody').on('click', '#delete', function () {
    if (confirm('确定要干掉我了？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',//get或post
            url: '/posts/' + id,//请求的地址
            data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a: 1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) {//成功的回调函数
                location.reload()
            }
        })
    }

})
