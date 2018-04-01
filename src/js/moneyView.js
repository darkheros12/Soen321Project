MoneyView = {

  render: function(data) {
    $('#totalDonations').text("Total: " + data.amount);
  }
};

$("#donateButton").click(function(){
  $("#amountToDonate").val('');
  $("contractToDonate").val('');
});

$("#spendButton").click(function(){
  $("#amountToSpend").val('');
  $("contractToSpend").val('');
});



/*$(function() {
  $(window).load(function() {
    MoneyView.init();
  });
});*/

