import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  // Options avancées :
  retry: {
    retries: 3,
    timeout: 5000,
  },
});

export default redis