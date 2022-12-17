import jwtDecode from 'jwt-decode';

const useAccount = () => {
  const token = localStorage.getItem('item');
  const decoded = jwtDecode(token)
  console.log(decoded)
  return decoded;
};

export default useAccount;