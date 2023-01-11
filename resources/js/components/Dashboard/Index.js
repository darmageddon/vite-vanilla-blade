(function () {
    const { numbers } = ComponentData;
    const total = numbers.reduce((previousValue, currentValue) => {
        previousValue += currentValue;
        return previousValue;
    }, 0);

    // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
    console.log(`${numbers.join(' + ')} = ${total}`);
})();