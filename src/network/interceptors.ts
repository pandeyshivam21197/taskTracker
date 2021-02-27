import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

interface IRequestInterceptor{
    onFulfilled: (value: AxiosRequestConfig) => AxiosRequestConfig;
    onRejected: (error: AxiosError) => AxiosError;
}

interface IResponseInterceptor{
    onFulfilled: (value: AxiosResponse) => AxiosResponse;
    onRejected: (error: AxiosError) => AxiosError;
}

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTE1OTA3NTU1OTA0NTA4MzEwNjE1In0sImdpdmVuX25hbWUiOiJTaGl2YW0iLCJmYW1pbHlfbmFtZSI6IlBhbmRleSIsIm5pY2tuYW1lIjoicGFuZGV5c2hpdmFtMjExOTciLCJuYW1lIjoiU2hpdmFtIFBhbmRleSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaGVHemVoWE01dzFreEU3UE9FSzhGbzNiUzhCLWItLU9vRVdhdGFBZz1zOTYtYyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMjEtMDItMjdUMDQ6Mjk6MjEuNDczWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1OTA3NTU1OTA0NTA4MzEwNjE1IiwiYXVkIjoiTXJVUzNzWUxKVFNaWjMyaVIzeDlIcEFidzM5VlVSVWgiLCJpYXQiOjE2MTQ0MDAxNzEsImV4cCI6MTYxNDQzNjE3MSwiYXRfaGFzaCI6InB5b2J5cy14aEhGcURKbkx4OUZkQUEiLCJub25jZSI6IjJKNFRWcmwyaE11clhLWWJzWVFsdk52Q29zcFB6ZWlNIn0.HCvpz6pFT2u0B44_ZTpx8rS5qudOaqREgtaW_ztEkw5U1fThfj5Ss1K3O_PgkCb7MviByboHe3_Cpc4b0wh3mMXQ8Y2PReT3XjE5xZoTxHASX0FcIs_6hNSIpqzQOY5Z-h4X6ywLcKBgXdhSiD4EqwnqAEsCyudR_mTWHE10Nksv0iXbLLZtjjzhAJv733oOV99vEHT5zbCWUx8TfFJM9hq0jJmgx1o-EdKbozcOY0TnzQc79zWkdTgPrN5Jd8MM7yX-wIW1oKMUajxeVXvgsnG18TqVPrvd8cejhuyKQ309zTP_I3dwWDQMGP1ebH_0RjLDHkQ9Yc3IExNfzCU6Ag'

export const requestInterceptors = (): IRequestInterceptor => {
    const onFulfilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }

    const onRejected = (error: AxiosError): AxiosError => error;

    return {onFulfilled, onRejected}
}

export const responseInterceptors = (): IResponseInterceptor => {
    const onFulfilled = (response: AxiosResponse): AxiosResponse => response;

    const onRejected = (error: AxiosError) => {
        if(error.response && error.response.data) {
        const {data: {erroCode}} = error.response;
        
        //TODO: use this error code for handling error/ refreshing token.

        if(erroCode === 'token not valid' || !token) {
            // TODO: refresh token
        }
        }
        
    }

    return {onFulfilled, onRejected}
}