import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './Grading.css';

const Grading = function (props) {
    // mode: "rating"  "pricing"
    // num: number of stars or dollar signs
    const { num } = props;
    const { mode } = props;

    const HalfStar = (
        <div id="half-star" className="fa-layers">
            <FontAwesomeIcon icon={faStarHalf} className="fill" />
            <FontAwesomeIcon icon={faStarHalf} flip="horizontal" className="empty" />
        </div>
    );

    const FullStar = <FontAwesomeIcon icon={faStar} className="fill" />;
    const EmptyStar = <FontAwesomeIcon icon={faStar} className="empty" />;
    const DollarSign = <FontAwesomeIcon icon={faDollarSign} className="dollar" />;

    const Stars = Array.from(Array(5)).map((x, index) => {
        const s = num - (index + 1);
        if (s === 0.5) {
            return HalfStar;
        } if (s > 0) {
            return FullStar;
        }

        return EmptyStar;
    });

    const Price = Array.from(Array(4)).map((x, index) => {
        if (num - index > 0) {
            return DollarSign;
        }
        return null;
    });

    return (
        mode === 'rating' ? Stars : Price
    );
};

export default Grading;
