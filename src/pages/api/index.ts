import type { APIRoute } from "astro"

export const post: APIRoute = async ({ request }) => {
  const { message } = (await request.json()) ?? {}
  if (!message) {
    return {
      body: JSON.stringify({
        success: false,
        message: "message is required"
      })
    }
  }

  const response = await fetch(`http://gz233.ycheng.tech:5040/chat-api/stream`, {
    method: "POST",
    headers: {
      "Content-Type": `application/json`
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  })
  let result = await response.json()
  if (result?.error) {
    return {
      body: JSON.stringify({
        success: false,
        message: `${result.error?.message}`
      })
    }
  }
  return {
    body: JSON.stringify({
      success: true,
      message: "ok",
      data: result?.choices?.[0].message
    })
  }
}
