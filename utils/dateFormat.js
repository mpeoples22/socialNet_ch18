const addDataSuffix  = date => {
    let datesStr = date.toString();
    //last char in string
    const lastChar = dateStr.charAt(dateStr.length - 1);
    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    }else if (lastChar === '3' && dateStr !== '13'){
        dateStr = `${dateStr}rd`;
    }else{
        dateStr = `${dateStr}th`;
    }
    return dateStr;
};

//format time stamp

module.exports = (
    timestamp, {monthLength = 'short', dateSuffix = true } = {}
) => {
    let month;
    if (monthLength = 'short'){
        month ={
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10:'Nov',
            11:'Dec',
        };
    }else {
        month = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'Septempber',
            9: 'October',
            10:'November',
            11:'December'
        };
    }
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth;
    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }
}
