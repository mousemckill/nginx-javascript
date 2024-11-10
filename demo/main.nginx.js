/// <reference path="./njs/build/ts/ngx_http_js_module.d.ts" />

function sum(r) {
  return r.args.a + r.args.b;
}

/**
 * @param {NginxHTTPRequest} r 
 */
function cookie(r) {
  const authToken = r.headersIn.Authorization.slice(7);
  const appVersion = r.headersIn['X-App-Version'];

  let cookies = [];
  
  if (authToken) {
    cookies.push(`token=${authToken};`);
  }
  
  if (appVersion) {
    cookies.push(`version=${appVersion};`);
  }

  r.headersOut['Set-Cookie'] = cookies;
}

function jwt(data) {
  var parts = data.split('.').slice(0,2)
      .map(v=>Buffer.from(v, 'base64url').toString())
      .map(JSON.parse);
  return { headers:parts[0], payload: parts[1] };
}

function jwt_payload_sub(r) {
  return jwt(r.headersIn.Authorization.slice(7)).payload.sub;
}

function error() {
  throw Error('Oppps!');

  r.return(200, 'Hello world');
}

/**
 * @param {NginxHTTPRequest} r 
 */
function console(r) {
  r.error('Oppps!');
  // r.log('Oppps!');
  // r.warn('Oppps!');
  
  r.return(200, 'Hello world');
}

async function promise(r) {
  await Promise.reject('Error!');

  r.return(200, 'Hello world');
}

export default { sum, cookie, jwt_payload_sub, error, console, promise }