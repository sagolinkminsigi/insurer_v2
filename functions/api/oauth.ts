export async function onRequestPost(c) {
  // const data = await c.env.DB.prepare(`select * from todos`).all()
  // return Response.json(data);
  const headers = {
    'Access-Control-Allow-Origin': '*', // 모든 도메인 허용
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 허용할 메서드
    'Access-Control-Allow-Headers': 'Content-Type', // 허용할 헤더
  };

  const requestBody = await c.request.json();

  return new Response(JSON.stringify({ "body": requestBody }), {
    headers: { ...headers, "Content-Type": "application/json" },
  });
}