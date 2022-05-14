import phin from "phin";
const delay = 1000;

export async function rateLimit(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export async function get(url: string, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "GET",
    url: url,
    headers: auth,
    parse: "json"
  });
}

export async function post(url: string, text: string, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "POST",
    url: url,
    headers: auth,
    parse: "json",
    data: {
      content: text,
    }
  });
}

export async function put(url: string, text: string, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "PUT",
    url: url,
    headers: auth,
    parse: "json",
    data: { delete_message_days: "7", text }
  });
}

export async function remove(url: string, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "DELETE",
    url: url,
    headers: auth,
    parse: "json",
  });
}

export async function reply(url: string, messageId: string, text: string, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "POST",
    url: url,
    headers: auth,
    parse: "json",
    data: {
      content: text,
      message_reference: { message_id: messageId }
    }
  });
}

export async function create(url: string, name: string, type: number, auth: object) {
  await rateLimit(delay);
  return await phin({
    method: "POST",
    url: url,
    headers: auth,
    parse: "json",
    data: { name, type }
  });
}


// eslint-disable-next-line @typescript-eslint/ban-types
export async function loop(callback: Function, delay: number) {
  await callback();
  return setInterval(callback, delay);
}

export { delay };