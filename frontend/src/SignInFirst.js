import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./styles.css";

function SignInFirst() {
  const navigate = useNavigate();
  const gifContainerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    gifContainerRef.current.appendChild(script);
  }, []);

  return (
    <div className="signin-first">
      <div
        ref={gifContainerRef}
        className="tenor-gif-embed"
        data-postid="15194421034682700946"
        data-share-method="host"
        data-aspect-ratio="1"
        data-width="100%"
      >
        <a href="https://tenor.com/view/no-emotiguy-emotiguy-no-mad-emotiguy-emotiguy-mad-gif-15194421034682700946">
          No Emotiguy Sticker
        </a>
        from <a href="https://tenor.com/search/no-stickers">No Stickers</a>
      </div>
      <button onClick={() => navigate("/signin")}>Go to Sign In</button>
    </div>
  );
}

export default SignInFirst;
