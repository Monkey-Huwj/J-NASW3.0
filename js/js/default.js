var mainText = "插秧插秧";
var specialTime = "00:00";
var specialText = "冲榜冲榜";
var indexdefault = {
    pageLoad: function () {
        var nowDate = new Date;
        
        $(".htmleaf-header h2").text(nowDate.Format("HH:mm:ss"));
        $(".tab_right h3").text("左侧为当前体力最大值");
        $(".tab_right h4").text("等于左侧体力值目标时间将恢复满");
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
        
        var datestr=nowDate_y+"-"+nowDate_M+"-"+nowDate_d+" "+nowDate_h+":"+(parseInt(nowDate.Format("mm").substr(0,1))+1)+"0:00";
        beginDate=new Date(datestr.replace(/-/g,"/"));
        
        // if(nowDate_m>=30){
        //     beginDate.setSeconds(beginDate.getSeconds()+3600);
        // }else{
        //     beginDate.setSeconds(beginDate.getSeconds()+1800);
        // }
        beginDate.setSeconds(beginDate.getSeconds()+600);
        return beginDate;
    },
    setTimeLevel:function(beginDate){
        beginDate.setSeconds(beginDate.getSeconds()-600);
        $(".app_inner__tab").each(function(){
            // beginDate.setSeconds(beginDate.getSeconds()+1800);
            // var beginDateStr = beginDate.Format("HH:mm");
            // $(this).find("h2").text(beginDateStr);
            // if(beginDateStr == specialTime){
            //     $(this).find("i").text(specialText);
            // }
            // else{
            //     $(this).find("i").text(mainText);
            // }
            var beginDate_H = beginDate.Format("HH");
            var beginDate_m = parseInt(beginDate.Format("mm").substr(0,1));
            if(beginDate.Format("HH:mm") == "11:50" || beginDate_H == "12"||beginDate_H == "13"){
                beginDate.setSeconds(beginDate.getSeconds()+600);
                var beginDateStr = beginDate.Format("HH:mm");
                $(this).find("h2").text(beginDateStr);

                if(beginDate_m%2==0){
                    $(this).find("i").text("决战收割");
                    $(this).find("p").text("SOUTH FOREVER！！！");
                }else{
                    $(this).find("i").text("决战施肥");
                    $(this).find("p").text("南方必胜！！！");
                }
                
                $(this).find("h3").text("一秒恢复一点体力！！！");
                $(this).find("h4").text("冲啊！！！加油！！！");
                
            }
            else{
                beginDate.setSeconds(beginDate.getSeconds()+600);
                var beginDateStr = beginDate.Format("HH:mm");
                $(this).find("h2").text(beginDateStr);
                if(beginDateStr == specialTime){
                    $(this).find("i").text(specialText);
                }
                else{
                    $(this).find("i").text(mainText);
                }
            }
        });

        //var maxDate = new Date;
        //maxDate.setSeconds(maxDate.getSeconds()+9990);
        
        //$(".app_inner__tab h2")[5].innerHTML = maxDate.Format("HH:mm");
    },
    setEnergyLevel:function(beginDate){
        var nowDate = new Date;
        beginDate.setSeconds(beginDate.getSeconds()-600);
        $(".tab_left__image h1").each(function(){
            // beginDate.setSeconds(beginDate.getSeconds()+1800);
            // var energy = indexdefault.getEnergyByTimeDiff(nowDate,beginDate)
            // $(this).text(energy);

            var beginDate_H = beginDate.Format("HH");
            if(beginDate_H == "12"){
                beginDate.setSeconds(beginDate.getSeconds()+600);
                var energy = indexdefault.getEnergyByTimeDiff(nowDate,beginDate)
                $(this).text(energy);
            }
            else if(beginDate_H == "13"){
                beginDate.setSeconds(beginDate.getSeconds()+600);
                var energy = indexdefault.getEnergyByTimeDiff(nowDate,beginDate)
                $(this).text(energy);
            }
            else{
                beginDate.setSeconds(beginDate.getSeconds()+600);
                var energy = indexdefault.getEnergyByTimeDiff(nowDate,beginDate)
                $(this).text(energy);
            }
        });

        //$(".tab_left__image h1")[5].innerHTML =0;
    },
    getEnergyByTimeDiff: function (nowDate,beginDate) {
        var energy = 0;

        if(beginDate.Format("HH") == "12" || beginDate.Format("HH") == "13"){
            var maxEnergySeconds = 999*1*1000;
            var diffSeconds = beginDate - nowDate;
            var energy = (maxEnergySeconds - diffSeconds) / 1000 / 1

        }else{
            var maxEnergySeconds = 999*10*1000;
            var diffSeconds = beginDate - nowDate;
            var energy = (maxEnergySeconds - diffSeconds) / 1000 / 10

        }

        return Math.ceil(energy)<0 ? 0 : Math.ceil(energy);
    },
    pageRefresh:function(){
        setInterval(function(){
            var nowDate = new Date;
            $(".htmleaf-header h2").text(nowDate.Format("HH:mm:ss"));
        },1000);
        
        setInterval(function(){
            indexdefault.setTimeLevel(indexdefault.getBeginDate());
            indexdefault.setEnergyLevel(indexdefault.getBeginDate());
        },1000);
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
