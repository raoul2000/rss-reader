
const proxyAuthKey = 'Bj5pnZEX6DkcG6Nz6AjDUT1bvcGRVhRaXDuKDX9CjsEs2';
const proxyUrl = 'http://s172418307.onlinehome.fr/site/my-proxy/proxy.php';
//const proxyUrl = 'http://s172418307.onlinehome.fr/site/my-proxy/cors.php';

export const fetchViaProxy = (url:string) => fetch(proxyUrl, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
        'HTTP_PROXY_AUTH': proxyAuthKey,
        'HTTP_PROXY_TARGET_URL': url
    }
});