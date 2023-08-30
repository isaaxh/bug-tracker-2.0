const Page404 = () => {
  const handleBackButtonClick = () => {
    window.history.back();
  };
  return (
    <div className='page-404'>
      <div>
        <h1>404</h1>
        <div>Page Not Found</div>
        <button type='button' onClick={handleBackButtonClick}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default Page404;
