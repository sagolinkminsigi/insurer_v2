export async function onRequestPost(c) {

  const headers = {
    'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 허용할 메서드
    'Access-Control-Allow-Headers': 'Content-Type', // 허용할 헤더
  };

  const requestBody = await c.request.json();

  /* 토큰 요청 */
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      // client_id: "6adc08cb995d6bb53705b5a312e04ab4",
      // redirect_uri: `${import.meta.env.VITE_KAKAO_REDIRECT_URL}/auth`,
      code: requestBody.code,
      // client_secret: "yn9pOmkWjyKaWgVfiSN72gC7VO0wdc5i",
    }),
  });

  const { id_token } = await res.json();

  return new Response(JSON.stringify({ "id_token": id_token }), {
    headers: { ...headers, "Content-Type": "application/json" },
  });
}