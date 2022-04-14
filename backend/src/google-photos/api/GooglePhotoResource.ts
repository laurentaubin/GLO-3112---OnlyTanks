import { getConfigForEnvironment } from "../../config";
import express, { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const fetch = require("node-fetch");
const cors = require("cors");

const googleConfig = getConfigForEnvironment().google;

const router = express.Router();

const oauth2Client = new OAuth2Client(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirectUrl);

router.post("/create-auth-link", cors(), (_req: Request, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/photoslibrary.readonly"],
    prompt: "consent"
  });
  res.send({ url });
});

router.get("/handle-google-redirect", async (req: Request, res: Response) => {
  const code = req.query.code;
  oauth2Client.getToken(code as string, (err: any, tokens: any) => {
    if (err) {
      throw new Error("Issue with Login");
    }
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    res.redirect(`${googleConfig.frontendBaseUrl}/create?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  });
});

router.get("/get-valid-token", async (req: Request, res: Response) => {
  try {
    const refreshToken = req.query.refreshToken;
    const request = await fetch(googleConfig.authTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: googleConfig.clientId,
        client_secret: googleConfig.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token"
      })
    });

    const data = await request.json();
    res.json({
      accessToken: data.access_token
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/google-photos", async (req: Request, res: Response) => {
  try {
    const request = await fetch(googleConfig.googlePhotosApiUrl, {
      method: "GET",
      headers: {
        Authorization: req.header("Authorization")
      }
    });
    const data = await request.json();
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/google-photos/blob", async (req: Request, res: Response) => {
  try {
    const baseUrl = req.query.imageUrl as string;
    const request = await fetch(baseUrl, {
      method: "GET"
    });
    const blob = await request.blob();
    res.type(blob.type);
    blob.arrayBuffer().then((buf: any) => {
      res.send(Buffer.from(buf));
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
