// 'use strict';

$(function() {
  // 低版本提示
  if (!$.support.leadingWhitespace) {
    var browserhtml='<DIV id=browser_ie style="DISPLAY: block" jQuery111108494359600613953="2"><DIV class=brower_info><DIV class=notice_info><P>你的浏览器版本过低，可能导致网站不能正常访问！<BR>为了你能正常使用网站功能，请使用这些浏览器。</P></DIV><DIV class=browser_list><SPAN><IMG src="images/Chrome.png"><BR>Chrome </SPAN><SPAN><IMG src="images/Firefox.png"><BR>Firefox </SPAN><SPAN><IMG src="images/Safari.png"><BR>Safari </SPAN><SPAN><IMG src="images/IE.png"><BR>IE9及以上 </SPAN></DIV></DIV></DIV>'
    $("body").prepend(browserhtml);
  }
});

// 表单验证
(function($) {
  $(function() {
    $('form').on('blur', 'textarea,input,select', function() {
      var e = $(this);
      if (e.attr('data-validate')) {
        var $checkdata = e.attr('data-validate').split(",");
        var $checkvalue = e.val();
        var $checkstate = true;
        var $checktext = "";
        if ($checkvalue != "" || e.attr("data-validate").indexOf("required") >= 0) {
            for (var i = 0; i < $checkdata.length; i++) {
                var $checktype = $checkdata[i].split(":");
                if (!$formcheck(e, $checktype[0], $checkvalue)) {
                    $checkstate = false;
                    $checktext = $checktext + "<span>" + $checktype[1] + "</span>  ";
                }
            }
        }
        if ($checkstate) {
            e.closest(".form-group").removeClass("check-error");
            e.closest(".form-group").find(".field").html('');
            e.closest(".form-group").addClass("check-success");
            // table表单验证
            if (e.closest("table .form-group.pop").length > 0) {
                e.popover('destroy');
                e.removeData("toggle");
                e.removeData("placement");
                e.removeData("content");
                e.removeData('trigger');
                e.unbind();
            }
        } else {
            e.closest(".form-group").removeClass("check-success");
            e.closest(".form-group").addClass("check-error");
            e.closest(".form-group").find(".field").html($checktext);
            // table表单验证
            if (e.closest("table .form-group.pop").length > 0) {
                // console.log($checktext);
                e.popover('destroy');
                e.data("toggle", "popover");
                e.data("placement", "bottom");
                e.data("content", $checktext);
                e.data("html", true);
                e.data("trigger", 'focus');
                e.popover('show');
            }
        }
      }
    });
    $formcheck = function (element, type, value) {
        // 验证多选select开始
        value=value||"";
        if(typeof(value)==="object"){
            return true;
        }
        // 验证多选select结束
        $pintu = value.replace(/(^\s*)|(\s*$)/g, "");
        switch (type) {
            case "required":
                return /[^(^\s*)|(\s*$)]/.test($pintu);
                break;
            case "chinese":
                return /^[\u0391-\uFFE5]+$/.test($pintu);
                break;
            case "number":
                return /^([+-]?)\d*\.?\d+$/.test($pintu);
                break;
            case "integer":
                return /^-?[1-9]\d*$/.test($pintu);
                break;
            case "plusinteger":
                return /^[1-9]\d*$/.test($pintu);
                break;
            case "unplusinteger":
                return /^-[1-9]\d*$/.test($pintu);
                break;
            case "znumber":
                return /^[1-9]\d*|0$/.test($pintu);
                break;
            case "fnumber":
                return /^-[1-9]\d*|0$/.test($pintu);
                break;
            case "double":
                return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "plusdouble":
                return /^[+]?\d+(\.\d+)?$/.test($pintu);
                break;
            case "unplusdouble":
                return /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/.test($pintu);
                break;
            case "english":
                return /^[A-Za-z]+$/.test($pintu);
                break;
            case "username":
                return /^[a-z]\w{3,}$/i.test($pintu);
                break;
            case "mobile":
                return /^\s*(1[3-9]\d{9})\s*$/.test($pintu);
                break;
            case "phone":
                return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "tel":
                return /^((\(\d{3}\))|(\d{3}\-))?1[3-9]\d{9}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
                break;
            case "email":
                return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
                break;
            case "url":
                return /^https:|http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
                break;
            case "ip":
                return /^[\d\.]{7,15}$/.test($pintu);
                break;
            case "qq":
                return /^[1-9]\d{4,10}$/.test($pintu);
                break;
            case "currency":
                return /^\d+(\.\d+)?$/.test($pintu);
                break;
            case "zipcode":
                return /^[1-9]\d{5}$/.test($pintu);
                break;
            case "chinesename":
                return /^[\u0391-\uFFE5]{2,15}$/.test($pintu);
                break;
            case "englishname":
                return /^[A-Za-z]{1,161}$/.test($pintu);
                break;
            case "age":
                return /^[1-99]?\d*$/.test($pintu);
                break;
            case "date":
                return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test($pintu);
                break;
            case "datetime":
                return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/.test($pintu);
                break;
            case "idcard":
                return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test($pintu);
                break;
            case "bigenglish":
                return /^[A-Z]+$/.test($pintu);
                break;
            case "smallenglish":
                return /^[a-z]+$/.test($pintu);
                break;
            case "color":
                return /^#[0-9a-fA-F]{6}$/.test($pintu);
                break;
            case "ascii":
                return /^[\x00-\xFF]+$/.test($pintu);
                break;
            case "md5":
                return /^([a-fA-F0-9]{32})$/.test($pintu);
                break;
            case "zip":
                return /(.*)\.(rar|zip|7zip|tgz)$/.test($pintu);
                break;
            case "img":
                return /(.*)\.(jpg|gif|ico|jpeg|png)$/.test($pintu);
                break;
            case "doc":
                return /(.*)\.(doc|xls|docx|xlsx|pdf)$/.test($pintu);
                break;
            case "mp3":
                return /(.*)\.(mp3)$/.test($pintu);
                break;
            case "video":
                return /(.*)\.(rm|rmvb|wmv|avi|mp4|3gp|mkv)$/.test($pintu);
                break;
            case "flash":
                return /(.*)\.(swf|fla|flv)$/.test($pintu);
                break;
            case "radio":
                var radio = element.closest("form").find('input[name="' + element.attr("name") + '"]:checked').length;
                return eval(radio == 1);
                break;
            default:
                var $test = type.split("#");
                if ($test.length > 1) {
                    switch ($test[0]) {
                        case "compare":
                            return eval(Number($pintu) + $test[1]);
                            break;
                        case "regexp":
                            return new RegExp($test[1], "gi").test($pintu);
                            break;
                        case "length":
                            var $length;
                            if (element.attr("type") == "checkbox") {
                                $length = element.closest("form").find('input[name="' + element.attr("name") + '"]:checked').length
                            } else {
                                $length = $pintu.replace(/[\u4e00-\u9fa5]/g, "**").length
                            }
                            return eval($length + $test[1]);
                            break;
                        case "ajax":
                            var $getdata;
                            var $url = $test[1] + $pintu;
                            $.ajaxSetup({
                                async: false
                            });
                            $.getJSON($url,
                                function (data) {
                                    $getdata = data.getdata
                                });
                            if ($getdata == "true") {
                                return true
                            }
                            break;
                        case "repeat":
                            return $pintu == jQuery('input[name="' + $test[1] + '"]').eq(0).val();
                            break;
                        case "function":
                            return eval($test[1])(element);
                            break;
                        default:
                            return true;
                            break
                    }
                    break
                } else {
                    return true;
                }
        }
    }
    $("form").submit(function () {
        $(this).find("input[data-validate],textarea[data-validate],select[data-validate]").trigger("blur");
        var numError = $(this).find(".check-error").length;
        if (numError) {
            $(this).find(".check-error").first().find("input[data-validate],textarea[data-validate],select[data-validate]").first().focus().select();
            return false
        }
    });
  });
  function submits(){
      $(this).find("input[data-validate],textarea[data-validate],select[data-validate]").trigger("blur");
      var numError = $(this).find(".check-error").length;
      if (numError) {
          $(this).find(".check-error").first().find("input[data-validate],textarea[data-validate],select[data-validate]").first().focus().select();
          return false;
      }
      return true;
  }
  $.fn.extend({
      submits:submits
  })
})(jQuery);

// 提示框
(function ($) {
    /**
     * 
     * 
     * @param {any} type 状态 success  info   warning  danger 四个状态
     * @param {any} content 内容
     * @param {any} times 显示时间 等于于0一直显示
     */
    function alert(type, content, times) {
        var type = type || 'danger';
        var content = content || '错误';
        var times = times || 3000;
        $('body .alert').remove();
        $('body').append('<div class="alert alert-' + type + ' alert-dismissible fade in text-center" style="position: fixed;top:0;width:100%;z-index:10"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <i class="icon icon-warn1 h4"></i> ' + content + '</div>');
        if (times > 0) {
            setTimeout(function () {
                $('body .alert').remove();
            }, times)
        }
    }
    /**
     *  弹出框提示
     * 
     * @param {any} type 类型 success error img 三个状态
     * @param {any} content 内容
     */

    function modal(type, content) {
        var title = '';
        var modalbody = '';
        if(typeof content != 'string' && typeof content != 'undefined'){
            console.error('Type error');
            return;
        }
        if (type === 'error') {
            content = content||'失败';
            modalbody = '<p><i class="iconfont icon-yjfssb1 text-danger" style="font-size: 100px;"></i></p><p style="font-size: 16px;">' + content + '</p>';
        } else if (type === 'success') {
            content = content || '成功';
            modalbody = '<p><i class="iconfont icon-yjfscg1 text-success" style="font-size: 100px;"></i></p><p style="font-size: 16px;">' + content + '</p>';
        } else if (type === 'img') {
            title = '预览';
            modalbody ='<img src="'+ content +'" style="max-width: 100%">';
        }else{
            title = type;
            modalbody = content;
        }
        var center = '<div id="msg" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mymodal" style="display: block; padding-right: 17px;"><div class="modal-dialog modal-dialog-blue" style="width: 430px;" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><span class="h4">' + title + '</span></div><div class="modal-body text-center">' + modalbody + '</div><div class="modal-footer" style="text-align: center;"><button type="button" class="btn btn-sm btn-default" style="width:80px;" data-dismiss="modal">确定</button></div></div></div></div>';
        if (type === 'img') {
            center = '<div id="msg" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mymodal" style="display: block; padding-right: 17px;"><div class="modal-dialog modal-lg modal-dialog-blue" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="close"><span aria-hidden="true">×</span></button> <span class="h4">' + title + '</span></div><div class="modal-body text-center">' + modalbody + '</div></div></div></div>';
        }

        if ($('#msg').length > 0 && $('#msg:hidden').length < 1) {
            $('#msg').on('hidden.bs.modal', function (e) {
                $('#msg').remove();
                $('body').append(center);
                $('#msg').modal('show');
            });
            $('#msg').modal('hide');
        } else {
            $('#msg').remove();
            $('body').append(center);
            $('#msg').modal('show');
        }

    }
    function confirm(message,callback){
        if(typeof message != 'string' && typeof message != 'undefined'){
            console.error('first Type error')
            return;
        }
        if(typeof callback != 'function' && typeof callback != 'undefined'){
            console.error('second Type error')
            return;
        }
        var title = '提示';
        var modal = '<div id="confirm" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mymodal" style="display: block; padding-right: 17px;"><div class="modal-dialog modal-dialog-blue" style="width: 430px;" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><span class="h4">' + title + '</span></div><div class="modal-body text-center">' + message + '</div><div class="modal-footer" style="text-align: center;"><button type="button" class="btn btn-sm btn-primary" style="width:80px;" id="mb_btn_ok">确定</button><button type="button" class="btn btn-sm btn-default" style="width:80px;" id="mb_btn_no">取消</button></div></div></div></div>';
        
        if ($('#confirm').length > 0 && $('#confirm:hidden').length < 1) {
            $('#confirm').on('hidden.bs.modal', function (e) {
                $('#confirm').remove();
                $('body').append(modal);
                $('#confirm').modal('show');
            });
            $('#confirm').modal('hide');
        } else {
            $('#confirm').remove();
            $('body').append(modal);
            $('#confirm').modal('show');
        }
        
        $("#mb_btn_ok").click( function() {
            $('#confirm').modal('hide');
            if( callback ) callback(true);
        });
        $("#mb_btn_no").click( function() {
            $('#confirm').modal('hide');
            if( callback ) callback(false);
        });
    }
    function loading(type, content){
        var title = '提示';
        var modalbody = content||'<img src="static/admin/images/loading.gif" width="100"><p class="h1 text-white">加载中。。。</p>';
        var center = '<div id="loading" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mymodal" style="display: block; padding-right: 17px;"><div class="modal-dialog modal-lg modal-dialog-blue" role="document"><div class=""><div class="modal-body text-center">' + modalbody + '</div></div></div></div>';
        if(type==="show"){
            if ($('#loading').length > 0 && $('#loading:hidden').length < 1) {
                $('#loading').on('hidden.bs.modal', function (e) {
                    $('#loading').remove();
                    $('body').append(center);
                    $('#loading').modal('show');
                });
                $('#loading').modal('hide');
            } else {
                $('#loading').remove();
                $('body').append(center);
                $('#loading').modal('show');
            }
            $('#loading .modal-dialog').css('top','50%');
            $('#loading .modal-dialog').css('margin-top',-($('#loading .modal-dialog').height()/2));
        }else if(type==="hide"){
            $('#loading').modal('hide');
        }else(
            console.log('loading()--参数错误！')
        )
        
    }
    $.extend({
        alerts: alert,
        modals: modal,
        loading: loading,
        confirm: confirm
    })
})(jQuery);

// 分页
(function () {
    /**
     * <ul class="page" maxshowpageitem="5" pagelistcount="10"  id="page"></ul>
     * //$("#page").initPage(71,1,fun);
     */
    $.fn.extend({
        "initPage": function (listCount, currentPage, fun) {
            var maxshowpageitem = $(this).attr("maxshowpageitem");
            if (maxshowpageitem != null && maxshowpageitem > 0 && maxshowpageitem != "") {
                page.maxshowpageitem = maxshowpageitem;
            }
            var pagelistcount = $(this).attr("pagelistcount");
            if (pagelistcount != null && pagelistcount > 0 && pagelistcount != "") {
                page.pagelistcount = pagelistcount;
            }

            var pageId = $(this).attr("id");
            page.pageId = pageId;
            if (listCount < 0) {
                listCount = 0;
            }
            if (currentPage <= 0) {
                currentPage = 1;
            }
            page.setPageListCount(pageId, listCount, currentPage, fun);

        }
    });
    var page = {
        "maxshowpageitem": 5, //最多显示的页码个数
        "pagelistcount": 10, //每一页显示的内容条数
        /**
         * 初始化分页界面
         * @param listCount 列表总量
         */
        "initWithUl": function (pageId, listCount, currentPage) {

            var pageCount = 1;
            if (listCount > 0) {
                var pageCount = listCount % page.pagelistcount > 0 ? parseInt(listCount / page.pagelistcount) + 1 : parseInt(listCount / page.pagelistcount);
            }
            var appendStr = page.getPageListModel(pageCount, currentPage);
            $("#" + pageId).html(appendStr);
        },
        /**
         * 设置列表总量和当前页码
         * @param listCount 列表总量
         * @param currentPage 当前页码
         */
        "setPageListCount": function (pageId, listCount, currentPage, fun) {
            listCount = parseInt(listCount);
            currentPage = parseInt(currentPage);
            page.initWithUl(pageId, listCount, currentPage);
            page.initPageEvent(pageId, listCount, fun);

        },
        "initPageEvent": function (pageId, listCount, fun) {
            $("#" + pageId + ">li[class='pageItem']").on("click", function () {
                if (typeof fun == "function") {
                    fun($(this).attr("page-data"));
                }
                page.setPageListCount(pageId, listCount, $(this).attr("page-data"), fun);
            });
        },
        "getPageListModel": function (pageCount, currentPage) {
            var prePage = currentPage - 1;
            var nextPage = currentPage + 1;
            var prePageClass = "pageItem";
            var nextPageClass = "pageItem";
            if (prePage <= 0) {
                prePageClass = "pageItemDisable";
            }
            if (nextPage > pageCount) {
                nextPageClass = "pageItemDisable";
            }
            var appendStr = "";
            appendStr += "<li class='" + prePageClass + "' page-data='1' page-rel='firstpage'>首页</li>";
            appendStr += "<li class='" + prePageClass + "' page-data='" + prePage + "' page-rel='prepage'>&lt;</li>";
            var miniPageNumber = 1;
            if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) <= pageCount) {
                miniPageNumber = currentPage - parseInt(page.maxshowpageitem / 2);
            } else if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) > pageCount) {
                miniPageNumber = pageCount - page.maxshowpageitem + 1;
                if (miniPageNumber <= 0) {
                    miniPageNumber = 1;
                }
            }
            var showPageNum = parseInt(page.maxshowpageitem);
            if (pageCount < showPageNum) {
                showPageNum = pageCount
            }
            for (var i = 0; i < showPageNum; i++) {
                var pageNumber = miniPageNumber++;
                var itemPageClass = "pageItem";
                if (pageNumber == currentPage) {
                    itemPageClass = "pageItemActive";
                }

                appendStr += "<li class='" + itemPageClass + "' page-data='" + pageNumber + "' page-rel='itempage'>" + pageNumber + "</li>";
            }
            appendStr += "<li class='" + nextPageClass + "' page-data='" + nextPage + "' page-rel='nextpage'>&gt;</li>";
            appendStr += "<li class='" + nextPageClass + "' page-data='" + pageCount + "' page-rel='lastpage'>尾页</li>";
            return appendStr;

        }
    }
})(jQuery);

// 时间格式化
function formatDate(date, fmt) {
    if(typeof date === 'string') date = new Date(date);
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "M+": (date.getMonth() + 1).toString(),     // 月
      "D+": date.getDate().toString(),            // 日
      "h+": date.getHours().toString(),           // 时
      "m+": date.getMinutes().toString(),         // 分
      "s+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
}

/**
 * ajax封装
 *
 * @param {string} url 请求地址
 * @param {json} data 请求数据
 * @param {function} callback 请求成功执行
 */
function ajaxpost(url, data, callback){
  $.ajax({
    url:url,
    type: 'post',
    cache: false,
    data:data,
    success: function(res){
      callback(res);
    },
    beforeSend: function (XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader("x-csrf-token", $.cookie('csrfToken'));
    },
    error: function(err){
      $.modals('error','请求失败, 请检查网络');
    }
  })
}