
//页面样式改进
//格式一二的项说明

//model 样式标签
var model=1;
var allQuestions=[];
var cid=null;
$(function () {
    var url=decodeURI(window.location.href);
    var argsIndex=url.split("?cid=");
    if(argsIndex.length<2&&argsIndex[1]!="undefined"){
        window.open("../html/showCatalog.html",'_self');

    }
    cid=parseInt(argsIndex[1]);
    $('#reslove').on('click',function (e) {
        //将显示区清空
        $('.question:eq(0)').html("<div></div>");
        allQuestions=[];
        //拆分题目
        //eachSub 题目列表
        var eachSub=$('textarea').val().trim().split(model==1 ? /\d+[、]+/g : /\d+\.\s?[\(\[【（][\s\S]*?/g);
        $.each(eachSub,function (i,ele){

            //将题目展示到html标签中
            //1.单选 2.多选 3.判断题 4.填空题 5.主观题
            //questionObj题目对象
            var questionObj= model==1 ? assembleSubModealOne(ele) : assembleSubModealTwo(ele);

            if(questionObj.err){
                //如果有错则跳过本次循环
                showErrorObj(questionObj,i);
                return  true;
            }
            switch (questionObj.typeId){
                case 1:
                    showMulChoise(questionObj,i);break;
                case 2:
                    showDMulChoise(questionObj,i);break;
                case 3:
                    showEstimate(questionObj,i);break;
                case 4:
                   showFilling(questionObj,i);break;
            }
            if (iIsEmpty(questionObj.questionName)){
                //如果为空则跳过本次循环
                return  true;
            }

            if(allQuestions.length<100){

                //封装cid:目录编号
                questionObj["catalogId"]=cid;
                allQuestions.push(questionObj);
            }else {
                //如果数量过多则结束循环
                toastr.error("你上传的题目超过一百道，请分批次上传！！！（保留了前一百道）");
                return false;
            }

        })
        //给input checkbox 添加点击显示
        $('.ui.checkbox').checkbox();
    })
    //清空输入、显示区
    $('#clear').on("click",function (e) {
        $('textarea').val("height",);
        $('.question:eq(0)').children().remove();
    })
    //隐藏或显示答案
    $('#show_answer').on("click",function (e) {
        if($('.answer').css("display")=="none"){
            $('.answer').css("display","block");

        }else {
            $('.answer').css("display","none");

        }
    })
    //
    $('.ui.sticky')
        .sticky();
    //题目上传
    $('#upload').on('click',function (event) {
        if(allQuestions.length==0){
            toastr.error("你没有上传题目！！");
            return;
        }
        allQuestions=JSON.stringify(allQuestions);
        //禁用登录按钮
        $loginFormSub=$('#upload');
        $loginFormSub.addClass("disabled");

        //发起登录请求
        $.ajax({
            type: 'POST', // 请求方式
            url: 'http:///192.168.10.100:18080/exam-online/questions/', // 请求地址
            data: allQuestions, // 请求携带的数据
            contentType: "application/json",
            dataType: 'json', // 期望后台返回的类型
            crossDomain: true, // 跨域
            xhrFields: {
                withCredentials: true
            },
            success: function (dataResponse) {
                uploadResponse(dataResponse)
            },
            error: function () {
                // 请求失败后的处理方法
                uploadResponse({
                    success:false,
                    message:'登录服务器发生异常'
                })

            }
        })
    })

    $.each($("textarea"), function(i, n){
        autoTextarea($(n)[0]);
    });
})

//样式切换
function toggleModel(i){
    model=i;
}
//解析题目样式一的
//eachSub 每个题目切片
function assembleSubModealOne(eachSub) {
    let me = this;
    //题目对象
    let subObj = {
        questionName:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        typeId:"", //1.单选 2.多选 3.判断题 4.填空题 5.主观题
        answer:"",
        // courseId:"",
        // difficulty:"",
        remark:"无",
    };
    //selReg 匹配选择题答案
    let selReg =/[ABCDabcd]+[\r\n]+|[（\(]+[ ]*?[ABCDabcd、]+[ ]*?[）\)]*/g
    let ansArrs =eachSub.match(selReg);
    //选择题
    if(ansArrs){
        if (ansArrs>1){
            //答案大于1
            subObj.err="答案数量大于1"
            // return
        }else {
            //答案
            let ans = ansArrs[0].trim().replace(/[（\(]*[）\)]*/g, '').trim().toUpperCase();
            let ansStr=""
            $.each(ans.split("、") ,function (i,ele) {
                ansStr += ele;
            })
            subObj.answer = ansStr;
            // 单选题与多选题
            subObj.typeId = ans.length===1 ? 1 : 2;

            //去答案
            let sourceTimu = eachSub.replace(selReg,"( )");
            // 拆分题干与选项
            let sourceTimuArr = sourceTimu.split(/[A-Z][、\.]/ig);
            var sourceTimuArrLength=sourceTimuArr.length;
            if(sourceTimuArrLength == 1){
                subObj.err = '选项不能为空';
            }else if(sourceTimuArrLength  > 5){
                subObj.err = '选项数量不能大于4个';
            }
            var count=0;
            for(var name in subObj){
                subObj[name]=sourceTimuArr[count++].trim();
                if(count>=sourceTimuArrLength){
                    break;
                }
            }
            return subObj;

        }
    }
    //判断题
    let judgeReg=/[（\(]+[√×]+[）\)]+/g
    ansArrs =eachSub.match(judgeReg);
    if(ansArrs){
        if (ansArrs>1){
            //答案不正确
            subObj.err="答案数量大于1"

        }
        else {
            //答案正确
            //替换（）()
            let ans = ansArrs[0].trim().replace(/[（\(]*[）\)]*/g, '').trim();
            //设置题目类型
            subObj.typeId = 3;
            //设置答案
            subObj.answer =  (ans === '对'|| ans === '正确'|| ans === '√') ? "对" : "错";
            //去答案
            let sourceTimu = eachSub.replace(judgeReg,"( )");
            //设置题目
            subObj.questionName=sourceTimu
            return subObj;

        }
    }



    return subObj
}
//解析题目样式二的
//eachSub 每个题目切片
function assembleSubModealTwo(eachSub) {
    //题目对象
    let subObj = {
        questionName:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        typeId:"", //1.单选 2.多选 3.判断题 4.填空题 5.主观题
        answer:[],
        // courseId:"",
        // difficulty:"",
        remark:"无",
        err:null,
    };
    //selReg 匹配选择题答案
    // let Mui =/[ABCDabcd]+[\r\n]+|[（\(]+[ABCDabcd、]+[）\)]*/g
    // let ansArrs =eachSub.match(selReg);
    let ansRel=null;
    let answer=null;
    if(eachSub.includes("单选题")){
        //选择题
        //设置题目类型
        subObj.typeId=1;

        //选项
        //答案
        ansRel=/正确答案\s?[:：]+[\n]?\s*([ABCD]+)/ig;
         answer=eachSub.match(ansRel);
        if(RegExp.$1.length==1){
            //填入答案
            subObj.answer=RegExp.$1;
            //去除答案
            eachSub=eachSub.replace(answer[0],'');
            if(eachSub.includes("答案解析")){
                //有解析
                eachSub=eachSub.split(/答案解析\s?[:：]?/g);
                if(eachSub.length==2){
                    //设置解析
                    subObj.remark=eachSub[1];
                    eachSub=eachSub[0];
                }
            }

            //提纯的题目
            let sourceTimu=eachSub.replace(/单选题.*?[\])）】]/g,'');
            //临时
            sourceTimu=sourceTimu.replace(/我的答案[:：][\n]?.*/g,'').trim();

            //拆分题目标题和选项
            let sourceTimuArr=sourceTimu.split(/\n[A-D][、\.：]/ig);

            var sourceTimuArrLength=sourceTimuArr.length;
            if(sourceTimuArrLength == 1){
                subObj.err = '选项不能为空';
            }else if(sourceTimuArrLength  > 5){
                subObj.err = '选项数量不能大于4个';
            }
            //临时
            subObj.optionD=subObj.optionD.replace(/我的答案[:：][\n]?.*/g,'').trim();

            //设置题目和选项
            var count=0;
            for(var name in subObj){
                subObj[name]=sourceTimuArr[count++].trim();
                if(count>=sourceTimuArrLength){
                    break;
                }
            }


        }else {
            //题目答案个数出错
            subObj.err="题目答案个数出错"
        }
        return subObj;
        //解析
    }else if(eachSub.includes("多选题")){
        //选择题
        //设置题目类型
        subObj.typeId=2;

        //选项
        //答案
        ansRel=/正确答案\s?[:：]+[\n]?\s*([ABCD、]+)/ig;
        answer=eachSub.match(ansRel);
        if(RegExp.$1.length>=1){
            //填入答案
            $.each(RegExp.$1.split("、") ,function (i,ele) {
                $.each(ele.split("") ,function (i,ele) {
                    subObj.answer.push(ele);
                })
            })
            //格式统一
            subObj.answer=subObj.answer.join("");
            //去除答案
            eachSub=eachSub.replace(answer[0],'');
            if(eachSub.includes("答案解析")){
                //有解析
                eachSub=eachSub.split(/答案解析\s?[:：]?/g);
                if(eachSub.length==2){
                    //设置解析
                    subObj.remark=eachSub[1];
                    eachSub=eachSub[0];
                }
            }

            //提纯的题目
            let sourceTimu=eachSub.replace(/多选题.*?[\])）】]/g,'');
            sourceTimu=sourceTimu.replace(/我的答案[:：][\n]?.*/g,'').trim();

            //拆分题目标题和选项
            let sourceTimuArr=sourceTimu.split(/\n[A-D][、\.：]/ig);

            var sourceTimuArrLength=sourceTimuArr.length;
            if(sourceTimuArrLength == 1){
                subObj.err = '选项不能为空';
            }else if(sourceTimuArrLength  > 5){
                subObj.err = '选项数量不能大于4个';
            }

            //设置题目和选项
            var count=0;
            for(var name in subObj){
                subObj[name]=sourceTimuArr[count++].trim();
                if(count>=sourceTimuArrLength){
                    break;
                }
            }


        }else {
            //题目答案个数出错
            subObj.err="题目答案个数出错"
        }
        return subObj;
    }else if(eachSub.includes("填空题")){

        subObj.typeId = 4;
        if(eachSub.match(/_{3,}/g)==null){
            subObj.err="没有标识符___"
            return subObj;
        }
        let len = eachSub.match(/_{3,}/g).length;
        ansRel=/正确答案\s?[:：][\n]?(.*)/ig;
        answer=eachSub.match(ansRel);

        //去除答案
        let fillinAns = RegExp.$1.split(/\s*[;；]\s*/g);


        if(len>0 && len <= fillinAns.length) {
            subObj.answer=fillinAns.join(";");
        } else {
            subObj.err = '填空题答案个数错误';
        }
        eachSub=eachSub.replace(answer[0],'');
        if(eachSub.includes("答案解析")){
            //有解析
            eachSub=eachSub.split(/答案解析\s?[:：]?/g);
            if(eachSub.length==2){
                //设置解析
                subObj.remark=eachSub[1];
                eachSub=eachSub[0];
            }
        }
        //提纯的题目
        let sourceTimu = eachSub.replace(/填空题.*?[\])）】]/g,'');
        sourceTimu=sourceTimu.replace(/我的答案[:：][\n]?.*/g,'').trim();

        //填写题目
        subObj.questionName=sourceTimu.trim()

        console.log(subObj)
        return subObj;






    }else if(eachSub.includes("判断题")){
        //选择题
        //设置题目类型
        subObj.typeId=3;

        //选项
        //答案
        ansRel=/正确答案\s?[:：]+[\n]?\s*([对错√×]+)/ig;
        answer=eachSub.match(ansRel);
        if(RegExp.$1.length==1){
            //填入答案
            subObj.answer=RegExp.$1;
            //去除答案
            eachSub=eachSub.replace(answer[0],'');
            if(eachSub.includes("答案解析")){
                //有解析
                eachSub=eachSub.split(/答案解析\s?[:：]?/g);
                if(eachSub.length==2){
                    //设置解析
                    subObj.remark=eachSub[1].trim();
                    eachSub=eachSub[0];
                }
            }

            //提纯的题目
            let sourceTimu=eachSub.replace(/判断题.*?[\])）】]/g,'');
            sourceTimu=sourceTimu.replace(/我的答案[:：][\n]?.*/g,'').trim();

            //拆分题目标题和选项
            let sourceTimuArr=sourceTimu.split(/[A-Z][、\.：]/ig);


            if(sourceTimuArr.length>=1){
                subObj.questionName=sourceTimuArr[0].trim()
            }
            return subObj;
        }else {
            //题目答案个数出错
            subObj.err="题目答案个数出错"
        }
        return subObj;
    }else {
        //该类型不支持
        subObj.err="该类型不支持"
        return subObj;
    }
}
//显示对象属性
function ShowTheObject(obj){
    var des = "";
    for(var name in obj){
        des += name + ":" + obj[name] + ";";
    }
    return des;
}
//单选题展示
function showMulChoise(obj,i){
    //复制模板样式
    var showObj=$('.mulchoise').eq(0).clone();
    //显示单选题
    showObj.css("display","block");
    //设置标题
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    // console.log();
    // $.extend(showObj,$('.mulchoise'));
    //给所有选项请name
    showObj.find('.title>label:eq(2)').prop("for",i)
    showObj.find('.option>input').attr("name",i)

    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);


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
    showObj.find('.option>input').attr("name",i)
    //设置选项
    showObj.find('.option:eq(0)>label').html('A： '+obj.optionA);
    showObj.find('.option:eq(1)>label').html('B： '+obj.optionB);
    showObj.find('.option:eq(2)>label').html('C： '+obj.optionC);
    showObj.find('.option:eq(3)>label').html('D： '+obj.optionD);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);

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
    showObj.find('.option>input').attr("name",i)
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    //设置答案
    showObj.find('.answer').html(obj.answer);
    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);
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
    showObj.find('.option>input').attr("name",i)
    //设置name属性
    showObj.find('.title>label:eq(0)').html(i+"、");
    showObj.find('.title>label:eq(2)').html(obj.questionName);
    //设置答案
    //showObj.find('.answer').html(obj.answer.shift()["equal"])
    // console.log(  obj.answer.shift()["equal"]
    showObj.find('.answer').html(obj.answer);

    //设置答案解析
    showObj.find('.remark .text').html(obj.remark);



    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}

//题目错误显示
function showErrorObj(obj,i){
    //复制模板样式
    var showObj=$('.errorObj').eq(0).clone();
    showObj.removeClass("hidden");
    //设置错误内容
    showObj.find('.header').html(i+"、"+obj.err);
    //将题目元素插入到页面中
    $('.question:eq(0)').append(showObj);
}
function uploadResponse(dataResponse) {
    $loginFormSub=$('#upload');
    // 请求成功后的处理方法
    if(dataResponse.success){
        //登录成功
        //登录成功吐司框
        toastr.success(dataResponse.message,null,{
            onHidden:function (){


                //上传成功后跳转到详情页面

            }
        })

        setTimeout(function () {
            $loginFormSub.removeClass('disabled')
        },1500)

        //两秒钟跳转导用户管理

    }else{
        //登录失败
        //登录失败吐司框
        toastr.error(dataResponse.message);
        //1.5解除禁用登录按钮

        setTimeout(function () {
            $loginFormSub.removeClass('disabled')
        },1500)
    }
}

/**
 * 文本框根据输入内容自适应高度
 * {HTMLElement}   输入框元素
 * {Number}        设置光标与输入框保持的距离(默认0)
 * {Number}        设置最大高度(可选)
 */
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