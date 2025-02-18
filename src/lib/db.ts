import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient(): Promise<ReturnType<typeof createClient>> {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
  }
  return redisClient;
}

export interface Message {
  id: string;
  content: string;
  createdAt: number;
}

export async function saveMessage(content: string): Promise<void> {
  const client = await getRedisClient();
  const message: Message = {
    id: crypto.randomUUID(),
    content,
    createdAt: Date.now(),
  };

  // messages:list anahtarında tüm mesaj ID'lerini saklıyoruz
  await client.lPush("messages:list", message.id);
  // Her mesajı kendi ID'si ile saklıyoruz
  await client.hSet(`message:${message.id}`, {
    id: message.id,
    content: message.content,
    createdAt: message.createdAt,
  });
}

export async function getMessages(): Promise<Message[]> {
  const client = await getRedisClient();

  // Tüm mesaj ID'lerini al
  const messageIds = await client.lRange("messages:list", 0, -1);

  if (!messageIds.length) return [];

  // Her ID için mesaj detaylarını al
  const messages = await Promise.all(
    messageIds.map(async (id: string) => {
      const data = await client.hGetAll(`message:${id}`);

      if (!data?.id) {
        return null;
      }

      return {
        id: data.id,
        content: data.content,
        createdAt: parseInt(data.createdAt, 10),
      } satisfies Message;
    })
  );

  // null değerleri filtrele ve tarihe göre sırala
  return messages
    .filter((msg): msg is Message => msg !== null)
    .sort((a, b) => b.createdAt - a.createdAt);
}
