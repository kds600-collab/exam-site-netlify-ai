export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "POST 요청만 가능합니다." }),
    };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Netlify 환경변수 OPENROUTER_API_KEY가 설정되지 않았습니다." }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const question = body.question || "";
    const context = body.context || "";
    const model = body.model || "openrouter/free";

    if (!question.trim()) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "질문이 비어 있습니다." }),
      };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://netlify.app",
        "X-Title": "Middle School Exam Study Site",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "너는 중학교 2학년 시험공부 도우미다. 답변은 짧고 정확하게 한국어로 한다. 시험범위 자료를 우선으로 답한다.",
          },
          {
            role: "user",
            content: `아래 시험범위 자료를 바탕으로 질문에 답해줘.\n\n[시험범위 자료]\n${context}\n\n[질문]\n${question}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: data?.error?.message || "OpenRouter 요청 실패", detail: data }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: data?.choices?.[0]?.message?.content || "답변을 불러오지 못했습니다.",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
