const Page404 = () => {
  const handleBackButtonClick = () => {
    window.history.back();
  };
  return (
    <div className='page-404'>
      <div>
        <h1>Oops something went wrong...</h1>
        <div>error 404</div>
        <button type='button' onClick={handleBackButtonClick}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
