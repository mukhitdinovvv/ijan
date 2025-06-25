from together import Together
import os

client = Together(api_key=os.environ.get("TOGETHER_API_KEY"))

def chat_with_ai(messages, model="meta-llama/Llama-Vision-Free"):
    response = client.chat.completions.create(
        model=model,
        messages=messages
    )
    return response.choices[0].message.content
