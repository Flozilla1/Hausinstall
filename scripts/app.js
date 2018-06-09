$(document).ready(function(){
    
    $(".all_cats").click(function(){
    
        $(".all_cats").removeClass("open").addClass("closed");
        $(this).toggleClass("open").removeClass("closed");
    });
})