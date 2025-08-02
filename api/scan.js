const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send("Method Not Allowed");
  }

  const { type, value } = req.body;
  let result = "";

  try {
    if (type === "ip") {
      const response = await fetch(`http://ip-api.com/json/${value}`);
      const data = await response.json();
      result = JSON.stringify(data, null, 2);
    } else if (type === "username") {
      result = `Checked multiple platforms for username: ${value}\n[Mock Result] Found on GitHub, Instagram`;
    } else if (type === "email") {
      result = `Email check for ${value}:\n[Mock Result] Looks valid. No breach detected.`;
    } else if (type === "phone") {
      result = `Phone info lookup for ${value}:\n[Mock Result] Pakistan Telecom | Location: Lahore`;
    } else if (type === "domain") {
      result = `WHOIS for ${value}:\n[Mock Result] Registered 2021. No DNSSEC.`;
    } else if (type === "url") {
      result = `URL scan: ${value}\n[Mock Result] No malware detected.`;
    } else {
      result = "Invalid scan type.";
    }

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error processing request");
  }
}
