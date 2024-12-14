"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyEmailTemplate = ({ name, url }) => {
    return `
<p>Dear ${name}</p>    
<p>Thank you for registering Binkeyit.</p>   
<a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
    Verify Email
</a>
`;
};
exports.default = verifyEmailTemplate;