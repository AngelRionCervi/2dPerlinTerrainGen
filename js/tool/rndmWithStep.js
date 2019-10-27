function randomWithStep(start, end, increments) {
    let numbers = [];
    for(let n = start; n <= end; n += increments) {
        numbers.push(n);
    }

    let randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}
