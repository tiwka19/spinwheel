import { createDirectus, graphql } from '@directus/sdk';
import { authentication } from '@directus/sdk';
export const getDirectusClient = async () => {
  const client = createDirectus('https://dash.todmail.com/').with(authentication()).with(graphql());
  await client.login('jolyfish23@gmail.com', 'dRWEHEvyNEeAWyvKp95', {});
  return client;
};

export function getAssetURL(id: number) {
  if (!id) return null;
  return `${import.meta.env.PUBLIC_DIRECTUS_URL}/assets/${id}`;
}
