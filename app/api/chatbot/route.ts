import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai';
import OpenAI from 'openai';
import { ChatCompletionTool } from 'openai/resources/index.mjs';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const tools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_form_state',
      description: 'Get the current form state in JSON format.',
    },
  },
  {
    type: 'function',
    function: {
      name: 'highlight_field',
      description: 'Highlights a field in the form so the user can know what field the assistant is talking about. Also returns the current form state.',
      parameters: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            description: 'The name of the field to highlight. If passed an empty string, will remove the highlight from the fields. For nested fields, use dot notation. For example, "address.city".',
          },
        },
      },
    }
  },
  {
    type: 'function',
    function: {
      name: 'insert_into_field',
      description: 'Inserts a value into a field in the form. Also highlights the field.',
      parameters: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            description: 'The name of the field to insert the value into. For nested fields, use dot notation. For example, "address.city".',
          },
          value: {
            type: 'string',
            description: 'The value to insert into the field. In case of dates always use the numeric representation of the date starting from 1. For example, "01" for January, "31" for the day, and "1990" for the year.',
          },
        },
      },
    }
  }
]

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages,
    tools,
  });

  const data = new experimental_StreamData();
  const stream = OpenAIStream(response, {
    experimental_onToolCall: async (
      { tools },
      createFunctionCallMessages,
    ) => {

    },
    onCompletion(completion) {
      console.log('completion\n', completion);
    },
    onFinal(completion) {
      data.close();
    },
    experimental_streamData: true,
  });

  return new StreamingTextResponse(stream, {}, data);
}