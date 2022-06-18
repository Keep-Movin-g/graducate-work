
var pid=null;
$(function (){
    var url=decodeURI(window.location.href);
    var argsIndex=url.split("?pid=");
    if(argsIndex.length<2&&argsIndex[1]!="undefined"){
        window.open("../html/showPapers.html",'_self');

    }
    pid=parseInt(argsIndex[1]);
    showQuestions();
})

function showQuestions() {
    let questions=getQuestions(pid).data;
    $.each(questions,function (i,questionObj) {
        switch (questionObj.typeId) {
            case 1:
                showMulChoise(questionObj, i+1);
                break;
            case 2:
                showDMulChoise(questionObj, i+1);
                break;
            case 3:
                showEstimate(questionObj, i+1);
                break;
            case 4:
                showFilling(questionObj, i+1);
                break;
        }
    })

    //给input checkbox 添加点击显示
    $('.ui.checkbox').checkbox();
}
//获得题目
function getQuestions(pid) {
    let getQuestions=null;
    $.ajax({
        type: 'GET', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/papers/'+pid, // 请求地址
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        async:false,    //同步提交
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {

            getQuestions=dataResponse;

        },
        error: function () {
            // 请求失败后的处理方法
            getQuestions={
                success:false,
                message:"查找登录服务器异常",
                code:"000000",
                data:null,
            }

        }
    })


    return getQuestions;

}

//单选题展示
function showMulChoise(obj,i){
    //复制模板样式
    var showObj=$('.mulchoise').eq(0).clone();
    //设置qid
    showObj.attr("qid",obj["qid"]);
    //显示单选题
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    // console.log();
    // $.extend(showObj,$('.mulchoise'));
    //给所有选项请name
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",obj["qid"])

    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);


    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//多选题展示
function showDMulChoise(obj,i){
    //复制模板样式
    var showObj=$('.Dmulchoise').eq(0).clone();
    //显示多选题
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);

    //设置name属性
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",obj["qid"])
    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);

    //设置qid
    showObj.attr("qid",obj["qid"]);
    //将选择题元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//判断题展示
function showEstimate(obj,i){
    //复制模板样式
    var showObj=$('.Estimate').eq(0).clone();
    //让题目显示
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",obj["qid"])
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);

    //设置qid
    showObj.attr("qid",obj["qid"]);
    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
//填空题展示
function showFilling(obj,i){
    //复制模板样式
    var showObj=$('.filling').eq(0).clone();
    //让题目显示
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(2)').prop("for",i)

    showObj.find('.option>input').attr("name",obj["qid"])
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);


    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}

var autoTextarea = function (elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ?
            function (name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'both';//如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值

    var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };

    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};
function iIsEmpty(test) {

    if(test.match(/^\s+$/)){
        return true;
    }
    if(test.match(/^[ ]+$/)){
        return true;
    }
    if(test.match(/^[ ]*$/)){
        return true;
    }
    if(test.match(/^\s*$/)){
        return true;
    } else {
        return false;
    }
}

//答案提交
function examUplaod() {
    //reply每一个答案  replies答案集合
    var replies=[];
    //获取单选，判读题答案
    $('.mulchoise').each(function (i,ele) {
        var reply={
            "qid":parseInt($(ele).attr("qid")),
            "myAnswer":$(ele).find("input:radio:checked").val(),
            "pid":pid
        }
        if (!isNaN(reply.qid)){
            replies.push(reply);
        }
    });
    $('.Estimate').each(function (i,ele) {
        var reply={
            "qid":parseInt($(ele).attr("qid")),
            "myAnswer":$(ele).find("input:radio:checked").val(),
            "pid":pid
        }
        if (!isNaN(reply.qid)){
            replies.push(reply);
        }
    });

    //获取多选题答案
    $(".Dmulchoise").each(function(i,ele){
        var str="";
        $(ele).find("input:checked:checked").each(function(i,ele){
            str+=$(ele).val();
        })
        var reply={
            "qid":parseInt($(ele).attr("qid")),
            "myAnswer":str,
            "pid":pid
        }

        if (!isNaN(reply.qid)){
            replies.push(reply);
        }

    })

    //获得填空题答案
    $('input:text').each(function (i,ele) {
        var reply={
            "qid":parseInt($(ele).attr("name")),
            "myAnswer":$(ele).val().trim(),
            "pid":pid
        }
        if (!isNaN(reply.qid)){
            replies.push(reply);
        }
    });

    replies=JSON.stringify(replies);


    // 发起登录请求
    $.ajax({
        type: 'POST', // 请求方式
        url: 'http://192.168.10.100:18080/exam-online/score/', // 请求地址
        data: replies, // 请求携带的数据
        contentType: "application/json",
        dataType: 'json', // 期望后台返回的类型
        crossDomain: true, // 跨域
        xhrFields: {
            withCredentials: true
        },
        success: function (dataResponse) {
            examUploadResponse(dataResponse)
        },
        error: function () {
            // 请求失败后的处理方法
            examUploadResponse({
                success:false,
                message:'登录服务器发生异常'
            })

        }
    })



}
//题目响应对象
function examUploadResponse(dataResponse) {

    if(dataResponse.success){
        //隐藏弹出框

        toastr.success(dataResponse.message,null,{
            onHidden:function (){
                window.history.back();
            }
        })
    }else{

        toastr.error(dataResponse.message)
    }
}
