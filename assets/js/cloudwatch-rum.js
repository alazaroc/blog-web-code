(function (n, i, v, r, s, c, x, z) {
  x = window.AwsRumClient = { q: [], n: n, i: i, v: v, r: r, c: c };
  window[n] = function (c, p) {
    x.q.push({ c: c, p: p });
  };
  z = document.createElement("script");
  z.async = true;
  z.src = s;
  document.head.insertBefore(
    z,
    document.head.getElementsByTagName("script")[0]
  );
})(
  "cwr",
  "98537d86-ca5e-4a41-a8f8-a11631692ef5",
  "1.0.0",
  "eu-west-1",
  "/assets/js/cwr.min.js",
  {
    identityPoolId: "eu-west-1:e24933c6-470e-45cf-892d-b1d88cb8e9de",
    sessionSampleRate: 1,
    endpoint: "https://dataplane.rum.eu-west-1.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
  }
);
