import { useEffect, useRef, useState } from "react";

// Hooks
import useUpdateEffect from "../hooks/useUpdateEffect";

// Components
import Dice from "./Dice/Dice";
import {
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
} from "./Rules/Rules";

// CSS
import "./App.scss";

const App = (props) => {
	const rollsLeft = useRef(3); // Rolls Left
	const [isRolling, setIsRolling] = useState(false);
	// ————————————————
	const dicesInitial = [
		{ id: 1, bullets: 1, freez: false },
		{ id: 2, bullets: 1, freez: false },
		{ id: 3, bullets: 1, freez: false },
		{ id: 4, bullets: 1, freez: false },
		{ id: 5, bullets: 1, freez: false },
	];
	const [dices, setDices] = useState(dicesInitial); // Dices
	const findDiceIndexById = (id) => {
		return dices.findIndex((dice) => dice.id === id);
	};
	// Roll Dices
	const rollDices = () => {
		const numbers = [1, 2, 3, 4, 5, 6];
		let newDices = [...dices];
		for (let i = 0; i < 5; i++) {
			let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
			// if dice was freezed do not change it's values!
			if (newDices[i].freez === false) {
				newDices[i].bullets = randomNumber;
			}
		}
		setIsRolling(true);
		setTimeout(() => {
			setIsRolling(false);
		}, 1000);
		rollsLeft.current -= 1;
		setDices(newDices);
	};
	// Toggle Dice Freez
	const toggleDiceFreez = (diceId) => {
		let newDices = [...dices];
		newDices[findDiceIndexById(diceId)].freez = !newDices[findDiceIndexById(diceId)].freez;
		setDices(newDices);
	};
	// Handle Dice Click
	const handleDiceClick = (diceId) => {
		toggleDiceFreez(diceId);
	};
	// ————————————————
	const scoresInitial = {
		ones: false,
		twos: false,
		threes: false,
		fours: false,
		fives: false,
		sixes: false,
		/* ——— */
		threeOfKind: false,
		fourOfKind: false,
		fullHouse: false,
		smallStraight: false,
		largeStraight: false,
		yahtzee: false,
		chance: false,
	};
	const [scores, setScores] = useState(scoresInitial);
	const totalScore = () => {
		let total = 0;
		for (let score in scores) {
			total += scores[score];
		}
		return total;
	};
	useUpdateEffect(() => {
		rollsLeft.current = 3;
		rollDices();
	}, [scores]);
	// ————————————————

	// ComponentDidMount
	useEffect(() => {
		rollDices();
	}, []);

	let rollButtonDisable = false;
	if (rollsLeft.current < 1) {
		rollButtonDisable = true;
	} else if (isRolling === true) {
		rollButtonDisable = true;
	}

	return (
		<div className="wrapper">
			<div className="head">
				<h1>Yahtzee!</h1>
				<div className="dices">
					{dices.map(({ id, bullets, freez }) => (
						<Dice
							key={id}
							bullets={bullets}
							freez={freez}
							isRolling={isRolling}
							onClick={() => handleDiceClick(id)}
						/>
					))}
				</div>
				<div className="roll">
					<button onClick={() => rollDices()} disabled={rollButtonDisable}>
						{rollsLeft.current > 0 ? rollsLeft.current + " Rolls Left" : "No Rolls Left"}
					</button>
				</div>
			</div>
			<div className="scores">
				<h2>Upper</h2>
				<ul>
					{/* ——— Ones ——— */}
					<li
						className={scores.ones === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, ones: isOnes(dices) })}
					>
						<span>Ones</span>
						<span>{scores.ones === false ? "1 point per 1" : scores.ones}</span>
					</li>
					{/* ——— Twos ——— */}
					<li
						className={scores.twos === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, twos: isTwos(dices) })}
					>
						<span>Twos</span>
						<span>{scores.twos === false ? "2 points per 2" : scores.twos}</span>
					</li>
					{/* ——— Threes ——— */}
					<li
						className={scores.threes === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, threes: isThrees(dices) })}
					>
						<span>Threes</span>
						<span>{scores.threes === false ? "3 points per 3" : scores.threes}</span>
					</li>
					{/* ——— Fours ——— */}
					<li
						className={scores.fours === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, fours: isFours(dices) })}
					>
						<span>Fours</span>
						<span>{scores.fours === false ? "4 points per 4" : scores.fours}</span>
					</li>
					{/* ——— Fives ——— */}
					<li
						className={scores.fives === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, fives: isFives(dices) })}
					>
						<span>Fives</span>
						<span>{scores.fives === false ? "5 points per 5" : scores.fives}</span>
					</li>
					{/* ——— Sixes ——— */}
					<li
						className={scores.sixes === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, sixes: isSixes(dices) })}
					>
						<span>Sixes</span>
						<span>{scores.sixes === false ? "6 points per 6" : scores.sixes}</span>
					</li>
				</ul>
				<h2>Lower</h2>
				<ul>
					{/* ——— Three of Kind ——— */}
					<li
						className={scores.threeOfKind === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, threeOfKind: isThreeOfKind(dices) })}
					>
						<span>Three of Kind</span>
						<span>
							{scores.threeOfKind === false ? "Sum all dice if 3 are the same" : scores.threeOfKind}
						</span>
					</li>
					{/* ——— Four of Kind ——— */}
					<li
						className={scores.fourOfKind === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, fourOfKind: isFourOfKind(dices) })}
					>
						<span>Four of Kind</span>
						<span>
							{scores.fourOfKind === false ? "Sum all dice if 4 are the same" : scores.fourOfKind}
						</span>
					</li>
					{/* ——— Full House ——— */}
					<li
						className={scores.fullHouse === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, fullHouse: isFullHouse(dices) })}
					>
						<span>Full House</span>
						<span>{scores.fullHouse === false ? "25 points" : scores.fullHouse}</span>
					</li>
					{/* ——— Small Straight ——— */}
					<li
						className={scores.smallStraight === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, smallStraight: isSmallStraight(dices) })}
					>
						<span>Small Straight</span>
						<span>{scores.smallStraight === false ? "30 points" : scores.smallStraight}</span>
					</li>
					{/* ——— Large Straight ——— */}
					<li
						className={scores.largeStraight === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, largeStraight: isLargeStraight(dices) })}
					>
						<span>Large Straight</span>
						<span>{scores.largeStraight === false ? "40 points" : scores.largeStraight}</span>
					</li>
					{/* ——— Yahtzee ——— */}
					<li
						className={scores.yahtzee === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, yahtzee: isYahtzee(dices) })}
					>
						<span>Yahtzee</span>
						<span>{scores.yahtzee === false ? "50 points" : scores.yahtzee}</span>
					</li>
					{/* ——— Chance ——— */}
					<li
						className={scores.chance === false ? "" : "disabled"}
						onClick={() => setScores({ ...scores, chance: isChance(dices) })}
					>
						<span>Chance</span>
						<span>{scores.chance === false ? "Sum all of the dices" : scores.chance}</span>
					</li>
				</ul>

				<h3>Total Score : {totalScore()}</h3>
			</div>
		</div>
	);
};

export default App;
