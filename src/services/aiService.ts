import { WebsitePrompt, OpenRouterResponse } from "@/types";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = "deepseek/deepseek-chat-v3-0324:free";

export const generateWebsite = async (websitePrompt: WebsitePrompt): Promise<string> => {
  try {
    const systemPrompt = `You are a website builder AI. 
    Generate ONLY valid HTML code based on the user's prompt. 
    Your response should ONLY contain the HTML code (with embedded CSS and JS if needed) without any explanations.
    Include responsive design with tailwind CSS classes.
    Use modern design principles and make the website visually appealing.
    The complexity level is ${websitePrompt.settings?.complexity || 'medium'}.
    The style is ${websitePrompt.settings?.style || 'modern'}.`;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.href,
        "X-Title": "Prompt Site Craft"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: websitePrompt.prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate website");
    }

    const data = await response.json() as OpenRouterResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating website:", error);
    throw error;
  }
};
