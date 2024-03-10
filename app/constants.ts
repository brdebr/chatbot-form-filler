export const metadataObj = {
  title: 'Chatbot Form Filler',
  description: 'A showcase of a chatbot form filler',
};

export const isProd = process.env.NODE_ENV === 'production';

export const APP_VERSION_HASH = process.env.COMMIT_DEPLOYED_HASH || 'dev';