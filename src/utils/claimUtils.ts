/**
 * Populate claims table with appropriate description
 * @param {Object} claims ID token claims
 * @returns claimsObject
 */
export const createClaimsTable = (claims: Record<string, string | number>): Record<number, [string, string | number, string]> => {
    let claimsObj: Record<number, [string, string | number, string]> = {};
    let index = 0;

    Object.keys(claims).forEach((key) => {
        if (typeof claims[key] !== 'string' && typeof claims[key] !== 'number') return;
        
        const descriptions: Record<string, string> = {
            aud: "Identifies the intended recipient of the token. In ID tokens, the audience is your app's Application ID, assigned to your app in the Microsoft Entra admin center.",
            iss: "Identifies the issuer, or authorization server that constructs and returns the token...",
            iat: "Issued At indicates when the authentication for this token occurred.",
            nbf: "The nbf (not before) claim identifies the time (as UNIX timestamp) before which the JWT must not be accepted for processing.",
            exp: "The exp (expiration time) claim identifies the expiration time (as UNIX timestamp) on or after which the JWT must not be accepted for processing.",
            name: "The name claim provides a human-readable value that identifies the subject of the token...",
            preferred_username: "The primary username that represents the user...",
            nonce: "The nonce matches the parameter included in the original /authorize request to the IDP...",
            oid: "The oid (user’s object id) is the only claim that should be used to uniquely identify a user in an external tenant...",
            tid: "The tenant ID. You will use this claim to ensure that only users from the current external tenant can access this app.",
            upn: "(user principal name) – might be unique amongst the active set of users in a tenant...",
            email: "Email might be unique amongst the active set of users in a tenant...",
            acct: "Available as an optional claim, it lets you know what the type of user (homed, guest) is...",
            sid: "Session ID, used for per-session user sign-out.",
            sub: "The sub claim is a pairwise identifier - it is unique to a particular application ID...",
            ver: "Version of the token issued by the Microsoft identity platform",
        };
        
        if (key === 'iat' || key === 'nbf' || key === 'exp') {
            populateClaim(key, changeDateFormat(claims[key] as number), descriptions[key] || '', index, claimsObj);
        } else if (!['uti', 'rh', '_claim_names', '_claim_sources'].includes(key)) {
            populateClaim(key, claims[key], descriptions[key] || '', index, claimsObj);
        }
        
        index++;
    });

    return claimsObj;
};

const populateClaim = (
    claim: string,
    value: string | number,
    description: string,
    index: number,
    claimsObject: Record<number, [string, string | number, string]>
): void => {
    claimsObject[index] = [claim, value, description];
};

const changeDateFormat = (date: number): string => {
    let dateObj = new Date(date * 1000);
    return `${date} - [${dateObj.toString()}]`;
};
