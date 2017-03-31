//专题概览
var group_overview_url='/group/group_overview/?submit_user='+submit_user;
$.ajax({
    url:group_overview_url,
    type: 'GET',
    dataType: 'json',
    async: true,
    success:group_overview
});
function group_overview(data) {
    var data = eval(data);
    $('#group_list').bootstrapTable('load', data);
    $('#group_list').bootstrapTable({
        data:data,
        search: true,//是否搜索
        pagination: true,//是否分页
        pageSize: 5,//单页记录数
        pageList: [5, 20, 40, 80],//分页步进值
        sidePagination: "client",//服务端分页
        searchAlign: "left",
        searchOnEnterKey: false,//回车搜索
        showRefresh: false,//刷新按钮
        showColumns: false,//列选择按钮
        buttonsAlign: "right",//按钮对齐方式
        locale: "zh-CN",//中文支持
        detailView: false,
        showToggle:true,
        sortName:'bci',
        sortOrder:"desc",
        columns: [
            {
                title: "群体名称",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[1];
                }
            },
            {
                title: "包含人数",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[2];
                }
            },
            {
                title: "创建时间",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return row[5];
                },
            },
            {
                title: "自动标签",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[3].length==0){
                        return '暂无';
                    }else {
                        var key='';
                        for (var k=0;k<row[3].length;k++){
                            key+=row[3][k]+' ';
                        }
                        return key;
                    }

                },
            },
            {
                title: "业务标签",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    if (row[4].length==0){
                        return '暂无';
                    }else {
                        var tag='';
                        for (var k=0;k<row[4].length;k++){
                            tag+=row[3][k]+' ';
                        }
                        return tag;
                    }
                },
            },
            {
                title: "群体查看",//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '群体查看';
                },
            },
            {
                title: '群体编辑',//标题
                field: "",//键名
                sortable: true,//是否可排序
                order: "desc",//默认排序方式
                align: "center",//水平
                valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return '群体编辑';
                },
            },
            //多选框
            {
                title: "群体对比",//标题
                field: "select",
                checkbox: true,
                align: "center",//水平
                valign: "middle"//垂直
            },

        ],
        onCheck:function (row) {
            group_diff.push(row[1]);
        },
        onUncheck:function (row) {
            group_diff.removeByValue(row[1]);
        },
        onClickCell: function (field, value, row, $element) {
            if ($element[0].innerText=='群体查看') {
                window.open('/group/result/?group_name='+row[1]);
            }else if ($element[0].innerText=='群体编辑') {
                // window.open(+row[1]);
            }
        }
    });
};

var group_diff=[];
$('#container .group_operating .operating .compared').on('click',function () {
    if (group_diff.length==2){
        window.open('/group/compare/?group_name1='+group_diff[0]+'&group_name2='+group_diff[1]);
    }else {
        alert('请您注意选择的专题，您只能选择2个。(请检查您勾选的专题)')
    }
});

//删除指定项
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};

