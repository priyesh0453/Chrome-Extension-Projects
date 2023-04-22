$(function(){
    $('#name').keyup(function(){
        $('#Greet').text(`Nice to meet you ${$('#name').val()}.`);
    })
})