import React, { useEffect } from "react";

const VerificationCheck = () => {

    const app_name = 'virtvogue-af76e325d3c9';
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        } else {
            return 'http://localhost:5001/' + route;
        }
    }

    const openLanding = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        const doVerify = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const paramValue = urlParams.get("userId");
                const jsonPayload = JSON.stringify({ userId: paramValue });
                const response = await fetch(buildPath('api/UpdateVerification'), {
                    method: 'POST',
                    body: jsonPayload,
                    headers: { 'Content-Type': 'application/json' }
                });
                const res = await response.json();

                if (res.error) {
                    console.log('Error:', res.error);
                    return;
                } else {
                    openLanding();
                }
            } catch (e) {
                console.error('Error:', e.toString());
                return;
            }
        };

        doVerify();
    }, []); // Run only once on component mount

    return null; // Return null since this component doesn't render anything visible
};

export default VerificationCheck;
