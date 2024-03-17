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
  },
  {
    name: 'insert_into_field',
    description: 'Inserts a value into a field in the form.',
    parameters: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          description: 'The name of the field to insert the value into.',
        },
        value: {
          type: 'string',
          description: 'The value to insert into the field. In case of dates always use the numeric representation of the date starting from 1. For example, "01" for January, "31" for the day, and "1990" for the year. For nationalities infer the correct one. For example "Brazilian" for Brazil, "American" for the United States, and so on. For phone numbers infer the complete number with the country code when you know the country of the user.',
        },
      },
    }
  }
];

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
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

  return new StreamingTextResponse(stream, {}, data);
}