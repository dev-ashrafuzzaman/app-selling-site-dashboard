import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';



export const serverURL = 'https://royalapi.leeryit.com'
export const mainURL = 'https://royalbill.leeryit.com'

// export const serverURL = 'http://localhost:3000'
// export const mainURL = 'http://localhost:5173'

const axiosSecure = axios.create({
  baseURL: serverURL
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {

    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {

        logoutUser().then(() => {

          navigate('/admin-auth/validation');
        });
      }
      return Promise.reject(error);
    });
  }, [navigate, logoutUser]);

  return [axiosSecure];
};

export default useAxiosSecure;