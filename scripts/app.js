$(document).ready(function(){
    $(".cat1").click(function(){
        $(this).addClass("col-1").removeClass("col-8")
        $(".cat1 div").css("display", "none")
    });
})