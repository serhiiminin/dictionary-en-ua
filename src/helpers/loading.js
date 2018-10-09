const isLoading = (currentLoadingNames = []) => (...loadingNamesToCheck) =>
  currentLoadingNames
    .some(currentLoadingName =>
      loadingNamesToCheck.includes(currentLoadingName)
    );

export default isLoading;
