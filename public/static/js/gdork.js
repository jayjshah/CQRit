$(document).ready(function(){
    $("#googleDorks").click(function () {
            $("#googleDorksModal").modal('show')
        })
})

function googleHacking(option) {
    var target = document.getElementById('dorkTarget').value;
    var link = "https://www.google.com/search?q=site:" + target;
    if (option == 1) {
        var dork = "+ext:doc+|+ext:docx+|+ext:odt+|+ext:rtf+|+ext:sxw+|+ext:psw+|+ext:ppt+|+ext:pptx+|+ext:pps+|+ext:csv+|+ext:txt+|+ext:pdf";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 2) {
        var dork = "+intitle:index.of";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 3) {
        var dork = "+ext:xml+|+ext:conf+|+ext:cnf+|+ext:reg+|+ext:inf+|+ext:rdp+|+ext:cfg+|+ext:txt+|+ext:ora+|+ext:ini+|+ext:env";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 4) {
        var dork = "+ext:sql+|+ext:dbf+|+ext:mdb";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 5) {
        var dork = "+ext:log";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 6) {
        var dork = "+ext:bkf+|+ext:bkp+|+ext:bak+|+ext:old+|+ext:backup";
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 7) {
        var dork = '+inurl:login+|+inurl:signin+|+intitle:Login+|+intitle:"sign+in"+|+inurl:auth';
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 8) {
        var dork = '+intext:"sql+syntax+near"+|+intext:"syntax+error+has+occurred"+|+intext:"incorrect+syntax+near"+|+intext:"unexpected+end+of+SQL+command"+|+intext:"Warning:+mysql_connect()"+|+intext:"Warning:+mysql_query()"+|+intext:"Warning:+pg_connect()"';
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 9) {
        var dork = '+"PHP+Parse+error"+|+"PHP+Warning"+|+"PHP+Error"';
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 10) {
        var uni = "https://www.google.com/search?q=site:";
        var dork = 'pastebin.com%20|%20site:paste2.org%20|%20site:pastehtml.com%20|%20site:slexy.org%20|%20site:snipplr.com%20|%20site:snipt.net%20|%20site:textsnip.com%20|%20site:bitpaste.app%20|%20site:justpaste.it%20|%20site:heypasteit.com%20|%20site:hastebin.com%20|%20site:dpaste.org%20|%20site:dpaste.com%20|%20site:codepad.org%20|%20site:jsitor.com%20|%20site:codepen.io%20|%20site:jsfiddle.net%20|%20site:dotnetfiddle.net%20|%20site:phpfiddle.org%20|%20site:ide.geeksforgeeks.org%20|%20site:repl.it%20|%20site:ideone.com%20|%20site:paste.debian.net%20|%20site:paste.org%20|%20site:paste.org.ru%20|%20site:codebeautify.org%20%20|%20site:codeshare.io%20|%20site:trello.com%20%22' + target + '"';
        var url = uni + dork;
        window.open(url, "_blank");
    }
    if (option == 11) {
        var uni = "https://www.google.com/search?q=site:";
        var dork = 'github.com%20|%20site:gitlab.com%20%22' + target + '"';
        var url = uni + dork;
        window.open(url, "_blank");
    }
    if (option == 12) {
        var dork = '+inurl:signup+|+inurl:register+|+intitle:Signup';
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 13) {
        var dork = '+inurl:access_token';
        var url = link + dork;
        window.open(url, "_blank");
    }
    if (option == 14) {
        var uni = "https://www.google.com/search?q=site:";
        var dork = 'github.com%20|%20site:gitlab.com%20%22' + target + '"';
        var url = uni + dork;
        window.open(url, "_blank");
    }
    if (option == 15) {
        var dork = ' inurl /proc/self/cwd';
        var url = link + dork;
        window.open(url, "_blank");
    }
                           


}