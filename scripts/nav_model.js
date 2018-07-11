var countOfCrums = 0

function addBreadcrum (){
    
    var name = $(that).parent()[0].getAttribute("name")
    var cat = ++countOfCrums        

    $("#breadcrums")[0].innerHTML += "<span cat='" + cat + "'> > " + name + "</span>"
    
    $("#breadcrums span").click(openBread)
}
function openBread(){
    target = "#cat-" + this.getAttribute("cat")
    open(target)
    cleanUpRemains()
    cleanUpRemains()
}
function cleanUpRemains () {
    var spot1 = $("#breadcrums")[0].innerHTML.lastIndexOf("<span")
    $("#breadcrums")[0].innerHTML = $("#breadcrums")[0].innerHTML.slice(0, spot1)
}