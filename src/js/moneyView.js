MoneyView = {

  render: function(data) {
    $('#totalDonations').text("Total: " + data.amount);
  },

  renderExpenditures: function(data) {

  },

  updateTotal: function(total) {
    $('#totalDonations').text("Total: " + total);
  }
};

/*$("#donateButton").click(function(){
  $("#amountToDonate").val('');
  $("contractToDonate").val('');
});

$("#spendButton").click(function(){
  $("#amountToSpend").val('');
  $("contractToSpend").val('');
});*/



/*$(function() {
  $(window).load(function() {
    MoneyView.init();
  });
});*/

