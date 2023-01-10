document.addEventListener('x.dashboard.index', function (e) {
    const numbers = e.detail.numbers;
    const total = numbers.reduce((previousValue, currentValue) => {
        previousValue += currentValue;
        return previousValue;
    }, 0);

    // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
    console.log(`${numbers.join(' + ')} = ${total}`);
});

document.addEventListener('x.dashboard.test', function (e) {
    const text = e.detail.text;

    // Text is testing
    console.log('Text is ' + text);
});

document.addEventListener('x.dashboard.detail', function (e) {
    const detail = e.detail.detail;

    // Detail: Id=12; Name=Unknown; Route=dashboard.detail
    console.log(`Detail: Id=${detail.id}; Name=${detail.name}; Route=${route().current()}`);
});