import { Request, Response } from "../types/Request";

export async function TokenMiddleWare(
  req: Request,
  res: Response,
  next: () => void
) {
  if (req.body == null)
    return res.send({
      error: true,
      code: 500,
      message: "Please Add data to the request body",
    });

  if (req.path == "/v1/CreateToken") return next();

  if (req.body.token == null)
    return res.send({
      error: true,
      code: 401,
      message: "Please Add a token to the request body",
    });

  const token = req.body.token;

  const tokenInfo = await db_Token.CheckToken(token);

  if (tokenInfo.allow) return next();

  console.log(tokenInfo.allow);

  return res.send({
    error: true,
    message: tokenInfo.message,
  });
}
