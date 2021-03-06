import axios from "axios";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2("", "", "https://localhost:4000");

const getGoogleAuthURL = () => {
  /*
   * Generate a url that asks permissions to the user's email and profile
   */
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes, // If you only need one scope you can pass it as string
  });
};

const getGoogleUser = async ({ code }) => {
  const { tokens } = await oauth2Client.getToken(code);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  return googleUser;
};

const googleAuth = async (input, context) => {
  const googleUser = await getGoogleUser({ code: input.code });

  /*
    let user = await this.userModel
      .findOne({ githubId: String(googleUser.id) })
      .exec();

    if (user) {
      // Update their profile

    }

    if (!user) {
      // Create the user in the database
      user = new User()
    }

    // Generate a JWT, add it as a cookie

    return user;*/
};
