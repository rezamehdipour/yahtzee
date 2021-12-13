function getDicesNumbers(dices) {
	let dicesNumbers = [];
	for (let dice of dices) {
		dicesNumbers.push(dice.bullets);
	}
	return dicesNumbers;
}

// 1 Points per One
function isOnes(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(1) !== -1) {
		for (let number of numbers) {
			if (number === 1) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}
// 2 Points per Two
function isTwos(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(2) !== -1) {
		for (let number of numbers) {
			if (number === 2) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}
// 3 Points per Three
function isThrees(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(3) !== -1) {
		for (let number of numbers) {
			if (number === 3) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}
// 4 Points per Four
function isFours(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(4) !== -1) {
		for (let number of numbers) {
			if (number === 4) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}
// 5 Points per Five
function isFives(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(5) !== -1) {
		for (let number of numbers) {
			if (number === 5) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}
// 6 Points per Six
function isSixes(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.indexOf(6) !== -1) {
		for (let number of numbers) {
			if (number === 6) {
				point += number;
			}
		}
		return point;
	} else {
		return point;
	}
}

// Sum all dice if 3 are the same
function isThreeOfKind(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	for (let number of numbers) {
		if (numbers.filter((num) => num === number).length === 3) {
			point = numbers.reduce((a, b) => a + b);
			break;
		}
	}
	return point;
}
// Sum all dice if 4 are the same
function isFourOfKind(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	for (let number of numbers) {
		if (numbers.filter((num) => num === number).length === 4) {
			point = numbers.reduce((a, b) => a + b);
			break;
		}
	}
	return point;
}
// Three of Kind + A Pair = FullHouse | 25 points
function isFullHouse(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	for (let number of numbers) {
		if (numbers.filter((num) => num === number).length === 3) {
			for (let number of numbers) {
				if (numbers.filter((num) => num === number).length === 2) {
					return numbers.reduce((a, b) => a + b);
				}
			}
		}
	}
	return point;
}
// 4 Of the dices have consecutive values (eg. 1,2,3,4) | 30 points
function isSmallStraight(dices) {
	const numbers = getDicesNumbers(dices);
	const sm = numbers.sort();
	let point = 0;
	if (sm[0] + 1 === sm[1] && sm[1] + 1 === sm[2] && sm[2] + 1 === sm[3]) {
		point = 30;
	} else if (sm[1] + 1 === sm[2] && sm[2] + 1 === sm[3] && sm[3] + 1 === sm[4]) {
		point = 30;
	}
	return point;
}
// 5 Of the dices have consecutive values (eg. 1,2,3,4,5) | 40 points
function isLargeStraight(dices) {
	let numbers = getDicesNumbers(dices);
	const sm = numbers.sort();
	let point = 0;
	if (sm[0] + 1 === sm[1] && sm[1] + 1 === sm[2] && sm[2] + 1 === sm[3] && sm[3] + 1 === sm[4]) {
		point = 40;
	}
	return point;
}
// Five of Kind | 50 points
function isYahtzee(dices) {
	const numbers = getDicesNumbers(dices);
	let point = 0;
	if (numbers.filter((number) => number === numbers[0]).length === 5) {
		point = 50;
	}
	return point;
}
// Sum all of the Dices
function isChance(dices) {
	const numbers = getDicesNumbers(dices);
	return numbers.reduce((a, b) => a + b);
}

export {
	getDicesNumbers,
	isOnes,
	isTwos,
	isThrees,
	isFours,
	isFives,
	isSixes,
	isThreeOfKind,
	isFourOfKind,
	isFullHouse,
	isSmallStraight,
	isLargeStraight,
	isYahtzee,
	isChance,
};
