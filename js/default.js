var indexdefault = {
    pageLoad: function () {
        var nowDate = new Date;
        
        $(".htmleaf-header h2").text(nowDate.Format("HH:mm:ss"));
        $(".tab_right h3").text("左侧为当前体力最大值");
        $(".tab_right h4").text("到达该时间体力将存满");
        $(".tab_right p").text("超过左侧体力值目标时间将会溢出");
        
        indexdefault.setTimeLevel(indexdefault.getBeginDate());
        indexdefault.setEnergyLevel(indexdefault.getBeginDate());
    },
    getBeginDate:function(){
        var nowDate = new Date;
        var nowDate_y = nowDate.getFullYear();
        var nowDate_M = nowDate.getMonth() + 1;
        var nowDate_d = nowDate.getDate();
        var nowDate_h = nowDate.getHours();
        var nowDate_m = nowDate.getMinutes();
        var nowDate_s = nowDate.getSeconds();
        var beginDate = nowDate;
        
        var datestr=nowDate_y+"-"+nowDate_M+"-"+nowDate_d+" "+nowDate_h+":00:00";
        beginDate=new Date(datestr.replace(/-/g,"/"));
        
        if(nowDate_m>=30){
            beginDate.setSeconds(beginDate.getSeconds()+3600);
        }else{
            beginDate.setSeconds(beginDate.getSeconds()+1800);
        }
        return beginDate;
    },
    setTimeLevel:function(beginDate){
        beginDate.setSeconds(beginDate.getSeconds()-1800);
        $(".app_inner__tab h2").each(function(){
            beginDate.setSeconds(beginDate.getSeconds()+1800);
            $(this).text(beginDate.Format("HH:mm"));
        });

        var maxDate = new Date;
        maxDate.setSeconds(maxDate.getSeconds()+9990);
        
        $(".app_inner__tab h2")[5].innerHTML = maxDate.Format("HH:mm");
    },
    setEnergyLevel:function(beginDate){
        var nowDate = new Date;
        beginDate.setSeconds(beginDate.getSeconds()-1800);
        $(".tab_left__image h1").each(function(){
            beginDate.setSeconds(beginDate.getSeconds()+1800);
            var energy = indexdefault.getEnergyByTimeDiff(nowDate,beginDate)
            $(this).text(energy);
        });
        $(".tab_left__image h1")[5].innerHTML =0;
    },
    getEnergyByTimeDiff: function (nowDate,beginDate) {
        var maxEnergySeconds = 999*10*1000;
        var diffSeconds = beginDate - nowDate;
        var energy = (maxEnergySeconds - diffSeconds) / 1000 / 10
        return Math.ceil(energy);;
    },
    pageRefresh:function(){
        setInterval(function(){
            var nowDate = new Date;
            $(".htmleaf-header h2").text(nowDate.Format("HH:mm:ss"));
        },1000);
        
        setInterval(function(){
            indexdefault.setTimeLevel(indexdefault.getBeginDate());
            indexdefault.setEnergyLevel(indexdefault.getBeginDate());
        },10000);
    } 
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    }

$(document).ready(function(){
    indexdefault.pageLoad();
    indexdefault.pageRefresh();
});
