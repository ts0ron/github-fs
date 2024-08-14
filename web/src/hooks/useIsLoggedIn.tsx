import useToken from "./useToken";

function useIsLoggedIn() {
  const {isTokenExpired} = useToken({})
  return !isTokenExpired;
}

export default useIsLoggedIn;