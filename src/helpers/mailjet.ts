/* import mailjet from "node-mailjet";

mailjet.connect(
  "a69083fe8b13a677e89d4d9b4d7c34a4",
  "46d86772aff15a49f8d8ece78f40222f"
);

export const mailer = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "victor.boyer@efrei.net",
        Name: "Victor",
      },
      To: [
        {
          Email: "victor.boyer@efrei.net",
          Name: "Victor",
        },
      ],
      Subject: "Nouvelle utilisateur !",
      TextPart: "SnoopChat",
      HTMLPart:
        "<h3>Bienvenue sur SnoopChat !</h3><br />Si vous n'avez pas créer de compte récemment, veuillez nous contacter. </br> L'équipe SnoopChat",
      CustomID: "snoopchat",
    },
  ],
});
 */
