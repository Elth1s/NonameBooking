import { Link } from "react-router-dom";

const NoMatch = () => {
    return (
        <>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </>
    );
}

export default NoMatch;