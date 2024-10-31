import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "secret";
const encodedKey = new TextEncoder().encode("secretKey");

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  console.log("session")
  console.log(session)

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  console.log("encrypt");
  console.log(payload);
  console.log("encodedKey");
  console.log(encodedKey);
  const signJwt = await new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("7d")
  .sign(encodedKey);
  console.log("signJwt");
  console.log(signJwt);
  return signJwt;
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    console.log("decrypt");
    console.log("payload");
    console.log(payload);
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
