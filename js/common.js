export const BASE_URL = 'http://running-mate.kro.kr';

async function refreshToken() {
    const response = await fetch(BASE_URL+'api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh_token')})
    });

    const data = await response.json();
    if (!response.ok) {
        alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요');
        window.location.href="/accounts/login.html";
    }

    // 새로운 액세스 토큰 저장
    localStorage.setItem('access_token', data.access);
    return data.access;
}

function getToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        console.error('Access token not found');
        alert('로그인 해주세요');
        window.location.href="/accounts/login.html";
    }

    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const exp = payload.exp;
    const now = Date.now() / 1000;

    // 토큰이 만료되면 새로운 토큰을 요청
    if (now > exp) {
        return refreshToken();
    }
    
    return Promise.resolve(accessToken);
}

async function securedApiRequest(endpoint, method, requestBody={}) {
    try {
        const token = await getToken();
        let init = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: method,
        }
        if (method != 'GET') {
            init['body'] = JSON.stringify(requestBody)
        }
        const response = await fetch(BASE_URL+endpoint, init);

        if (!response.ok) {
            throw new Error('api error');
        }
        // 응답 처리
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error during secured API request', error);
    }
}

export { securedApiRequest }