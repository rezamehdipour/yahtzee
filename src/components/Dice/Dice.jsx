// CSS
import "./Dice.scss";

const Dice = ({ bullets, freez, isRolling, onClick }) => {
	return (
		<div
			className={`dice ${freez === true ? "freez" : ""} ${isRolling === true ? "rolling" : ""}`}
			onClick={onClick}
		>
			<div className={`bullets b${bullets}`}>
				{Array.from(Array(bullets).keys()).map((z, i) => (
					<div key={i} className="bullet" />
				))}
			</div>
		</div>
	);
};

export default Dice;
