$(function()
{
    chrome.storage.sync.get('Limit', function(expense)
    {
        $('#Limit').val(expense.Limit);
    })

    $('#SaveMaxLimit').click(function()
    {
        var Limit = $('#Limit').val();
        
        if(Limit)
        {
            chrome.storage.sync.set({'Limit': Limit}, function()
            {
                close();
            });
        }
    });

    $('#ResetTotal').click(function()
    {
        chrome.storage.sync.set({'Total': 0}, function()
        {
            var notif = {
                type: 'basic',
                iconUrl: 'ExpenseManager_48.png',
                title: 'Expenses Reset!',
                message: 'Fresh Start :)'
            };
            chrome.notifications.create('ResetNotif', notif);
        });
    });
});