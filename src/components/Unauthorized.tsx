
const Unauthorized = () => {

    const handleBackButtonClick = () => {
        window.history.back();
    };
    return (
        <div className="page-unauthorized">
            <h1>Ops, how did we get here.</h1>
            <h1>Lets go back</h1>
            <button onClick={handleBackButtonClick}>Go Back</button> 
        </div>
    )
}

export default Unauthorized
