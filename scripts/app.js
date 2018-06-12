$(document).ready(function(){
    
    $(".all_cats").click(open);
//    $(".cat_bar").click(close);

});

function open () {
    $(".all_cats").removeClass("open").addClass("closed");
    $(this).addClass("open").removeClass("closed");
}
//function close () {
//    console.log(this.getParentNode)
//    $(this.getParentNode).removeClass("open").addClass("closed");
//}