import React, { useEffect } from "react";

export default function ChatBubble() {
  useEffect(() => {
    const avatarUrl = "/assets/ai-mentor.png"; // public folder path

    // Clear cached webchat
    localStorage.removeItem("bp-webchat-config");
    localStorage.removeItem("bp-webchat");

    // Test if image loads
    const imgTest = new Image();
    imgTest.src = avatarUrl;
    imgTest.onload = () => console.log("✅ Bot avatar loaded successfully:", avatarUrl);
    imgTest.onerror = () => console.error("❌ Failed to load bot avatar:", avatarUrl);

    // Load Botpress script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script.async = true;

    script.onload = () => {
      if (window.botpress) {
        window.botpress.on("webchat:ready", () => {
          window.botpress.open();
        });

        window.botpress.init({
          botId: "9a3d075d-8b7b-4fd8-a8fe-1295f0f937d0",
          configuration: {
            version: "v2",
            botName: "AI Mentor",
            botAvatarUrl: avatarUrl,
            botAvatarInitials: "", // disables default "A"
            color: "#3276EA",
            variant: "solid",
            headerVariant: "glass",
            themeMode: "light",
            fontFamily: "inter",
            radius: 4,
            feedbackEnabled: false,
            footer: "[⚡ by Botpress](https://botpress.com/?from=webchat)",
            soundEnabled: false,
            website: {},
            email: {},
            phone: {},
            termsOfService: {},
            privacyPolicy: {}
          },
          clientId: "18d97f45-fd2b-4960-b805-cbb19289a2b9",
          selector: "#webchat"
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="webchat" style={{ width: "500px", height: "500px" }}></div>;
}
