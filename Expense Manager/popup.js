$(function()
{
    chrome.storage.sync.get(['Total', 'Limit'], function(expense)
    {
        $('#Total').text(expense.Total);
        $('#Limit').text(expense.Limit);
    })

    $('#ExpenseAmount').click(function()
    {
        chrome.storage.sync.get(['Total', 'Limit'], function(expense)
        {
            var tempTotal = 0;

            if(expense.Total)
            {
                tempTotal += parseInt(expense.Total);
            }

            var amount = $('#amount').val();

            if(amount)
            {
                tempTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'Total': tempTotal}, function()
            {
                if(amount && tempTotal >= expense.Limit)
                {
                    var notif = {
                        type: 'basic',
                        iconUrl: 'ExpenseManager_48.png',
                        title: 'Limit Reached!',
                        message: 'Gotta look at your expenses :)'
                    };
                    chrome.notifications.create('LimitNotif', notif);    
                }
            });

            $('#Total').text(tempTotal);
            $('#amount').val('');
        });
    });
});