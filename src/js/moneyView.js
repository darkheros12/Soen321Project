MoneyView = {

  render: function(data) {
    $('#totalDonations').text("Total: " + data.amount);
  },

  renderExpenditures: function(data) {
    var HeaderBoxP1 = "<div class='jumbotron' style='padding-top: 0.5em; padding-bottom: 0.5em;'>";
    var HeaderBoxP2 = "<h2 class='text-center'>Expenditure List</h2></div>";
    var expenditureInfo = "";
    var emptyTableMsg = "";
    var TableHeader = "";
    var expenditureList = "";

    for(var index=0; index<data.length; index++) {
      var accountInfo = "<tr><td>" + data[index].account + "</td>";
      var amountSpent = "<td>" + data[index].amount + "</td>";
      var reasonGiven = "<td>" + data[index].reason + "</td></tr>";

      expenditureList += accountInfo + amountSpent + reasonGiven;
    }

    if(data.lenght <= 0) {
      emptyTableMsg = "The Expenditure List is empty.";
    }
    else {
      TableHeader = "<tr><th>Acoount Information</th> <th>Amount Spent</th> <th>Reason Given</th></tr>";
    }

    var backToTop = "<a href=\"http://localhost:3000/Donation.html\"><button>Back to top</button></a>";
    expenditureInfo = HeaderBoxP1 + HeaderBoxP2 + "<table class='table'>" + TableHeader + expenditureList + "</table><br/>" + backToTop;

    $('#expenditure').html(expenditureInfo);



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

