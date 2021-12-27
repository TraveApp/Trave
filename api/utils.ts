import * as Random from "expo-random";
import Rijndael from "rijndael-js";
import { pad, unpad } from "pkcs7-padding";
import pbkdf2 from "pbkdf2";
import { Buffer } from "buffer";

if (String.prototype.replaceAll === undefined) {
  // @ts-ignore
  String.prototype.replaceAll = function (substr: string, newSubstr: string) {
    return this.split(substr).join(newSubstr);
  };
}

export function encrypt(data: string): string {
  const salt = Random.getRandomBytes(32);
  const iv = Buffer.from(Random.getRandomBytes(32));
  const key = pbkdf2.pbkdf2Sync("Portal Pasażera", salt, 1000, 32, "sha1");
  const rjn = new Rijndael(key, "cbc");
  const encrypted = Buffer.from(rjn.encrypt(pad(data, 32), "256", iv));
  return Buffer.concat([salt, iv, encrypted])
    .toString("base64")
    .replaceAll("+", "scc2B")
    .replaceAll("/", "scc2F");
}

export function decrypt(data: string): string {
  const buf = Buffer.from(
    data.replaceAll("scc2B", "+").replaceAll("scc2F", "/"),
    "base64"
  );
  const salt = buf.slice(0, 32);
  const iv = buf.slice(32, 64);
  const key = pbkdf2.pbkdf2Sync("Portal Pasażera", salt, 1000, 32, "sha1");
  const rjn = new Rijndael(key, "cbc");
  const decrypted = unpad(Buffer.from(rjn.decrypt(buf.slice(64), "256", iv)));
  return decrypted.toString("utf8");
}

export function toOADate(date: Date): number {
  return date.getTime() / 86400000 + (25569 + 1 / 24);
}

export function fromOADate(oadate: number): Date {
  return new Date(Math.round((oadate - 25569 - 1 / 24) * 86400000));
}
