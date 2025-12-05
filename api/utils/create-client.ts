import axios from 'axios';

export function createClient(
  baseURL = process.env.NEXT_PUBLIC_BASE_URL,
  config = {}
) {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...config,
  });

  axiosInstance.interceptors.request.use(
        (config) => {
            const storedUser = localStorage.getItem("user")
            if (storedUser) {
              const user = JSON.parse(storedUser); // Or retrieve from localStorage
              if (user?.token) {
                  config.headers.Authorization = `Bearer ${user?.token}`;
              }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

  return axiosInstance;
}
