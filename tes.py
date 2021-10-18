import requests

res = requests.post(
    "https://api.mailgun.net/v3/sandboxd44611351e824d8c89197b0941400f65.mailgun.org/messages",
    auth=("api", "db2caef71c36d2df2a9bab3af44fc748-6ae2ecad-ad789f1e"),
    data={"from": "Mailgun Sandbox <postmaster@sandboxd44611351e824d8c89197b0941400f65.mailgun.org>",
          "to": "Heroku <app197611565@heroku.com>",
          "subject": "Hello Heroku",
          "template": "verify_email",
          "h:X-Mailgun-Variables": '{"link": "https://instagram.com/arsaizdihar"}'})
print(res.text)
