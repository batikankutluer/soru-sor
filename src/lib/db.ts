import { createClient } from "redis";

let redis: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL });
    await redis.connect();
  }
  return redis;
}

export interface Message {
  id: string;
  content: string;
  createdAt: number;
}

export async function saveMessage(content: string): Promise<void> {
  const redis = await getRedisClient();
  const message: Message = {
    id: crypto.randomUUID(),
    content,
    createdAt: Date.now(),
  };

  // messages:list anahtarında tüm mesaj ID'lerini saklıyoruz
  await redis.lPush("messages:list", message.id);
  // Her mesajı kendi ID'si ile saklıyoruz
  await redis.hSet(`message:${message.id}`, {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
  });
}

export async function getMessages(): Promise<Message[]> {
  const redis = await getRedisClient();

  // Tüm mesaj ID'lerini al
  const messageIds = await redis.lRange("messages:list", 0, -1);

  if (!messageIds.length) return [];

  // Her ID için mesaj detaylarını al
  const messages = await Promise.all(
    messageIds.map(async (id) => {
      const data = await redis.hGetAll(`message:${id}`);
      if (!data || !data.id) return null;

      return {
        id: data.id,
        content: data.content,
        createdAt: parseInt(data.createdAt),
      } satisfies Message;
    })
  );

  // null değerleri filtrele ve tarihe göre sırala
  return messages
    .filter((msg): msg is Message => msg !== null)
    .sort((a, b) => b.createdAt - a.createdAt);
}
