import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources/index.mjs';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const functions: ChatCompletionCreateParams.Function[] = [
  {
    name: 'get_form_state',
    description: 'Get the current form state.',
  },
  {
    name: 'highlight_field',
    description: 'Highlights a field in the form so the user can know what field the assistant is talking about.',
    parameters: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          description: 'The name of the field to highlight. If passed an empty string, will remove the highlight from the fields.',
        },
      },
    }
  }
];

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages,
    functions,
  });

  const data = new experimental_StreamData();
  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages,
    ) => {

    },
    onCompletion(completion) {
      console.log('completion', completion);
    },
    onFinal(completion) {
      data.close();
    },
    experimental_streamData: true,
  });

  data.append({
    text: 'You are an assistant in charge to help the user fill a form. You must ask the user for the information needed to fill the form until is complete. At first you must call the function `get_form_state` to get the current form state.',
  });

  return new StreamingTextResponse(stream, {}, data);
}