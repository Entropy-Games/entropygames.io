const IS_STAGING = false;
let site = 'https://';
if (IS_STAGING) site += 'staging.';
site += 'entropygames.io';
const SITE_ROOT = site;

let port = 30004;
if (IS_STAGING) port = 30005;

https.createServer({
    port,
    cert: open('certificate.pem', 'utf-8').str(),
    key: open('privatekey.pem', 'utf-8').str(),
    secure: true,
    corsOrigin: SITE_ROOT,
    debug: false
}, {
    '/': func () {
        return {};
    },

    '/ping': func () {
        return { ok: true };
    },

    '/log-visit': func (body: any) {
        return { success: true };
    }
});