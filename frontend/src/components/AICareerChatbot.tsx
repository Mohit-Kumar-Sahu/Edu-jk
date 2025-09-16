import React, { useEffect } from 'react';

export function AICareerChatbot() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.thinkstack.ai/bot/thinkstackai-loader.min.js';
    script.async = true;
    script.setAttribute('chatbot_id', '68c28cc24a347986e2d2cce8');
    script.setAttribute('data-type', 'default');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
