var contextMenuItem =
{
    "id": "Expenditure",
    "title": "Expense",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value)
{
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData)
{
    if(clickData.menuItemId === "Expenditure" && clickData.selectionText)
    {
        if(isInt(clickData.selectionText))
        {
            chrome.storage.sync.get(['Total', 'Limit'], function(expense)
            {
                var tempTotal = 0;
                if(expense.Total)
                {
                    tempTotal += parseInt(expense.Total);
                }
                tempTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'Total': tempTotal}, function()
                {
                    if(tempTotal >= expense.Limit)
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
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, areaName) 
{
    if(changes.hasOwnProperty('Total')) 
    {
        chrome.storage.sync.get({'Total': 0 }, function(result) 
        {
            var newValue = result.Total;
            chrome.action.setBadgeText({text: newValue ? newValue.toString() : '' });
        });
    }
});  