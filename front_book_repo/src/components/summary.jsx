import React from "react";

const Summary = ({ count, item='books' }) => {
    const content = count ? `Showing ${count} ${item} from the database.` : `No ${item} in the database.`
return <p>{content}</p>;
};

export default Summary;
