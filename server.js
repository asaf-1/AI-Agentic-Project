const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const PUBLIC_DIR = path.join(__dirname, "public");

const state = {
  bookings: [],
  contacts: [],
  reports: [],
  scans: 0,
  metricRefreshes: 0
};

const metricBase = {
  assets: "$5.2B+",
  properties: "168",
  occupancy: "97.4%",
  activeRisks: "3"
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(payload);
}

function getStaticFilePath(urlPath) {
  const normalizedPath = urlPath === "/" ? "/index.html" : urlPath;
  const resolvedPath = path.normalize(path.join(PUBLIC_DIR, normalizedPath));

  if (!resolvedPath.startsWith(PUBLIC_DIR)) {
    return null;
  }

  return resolvedPath;
}

function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    request.on("data", (chunk) => {
      rawBody += chunk;

      if (rawBody.length > 1_000_000) {
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(new Error("Invalid JSON payload"));
      }
    });

    request.on("error", reject);
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function validateRequiredFields(payload, fields) {
  const errors = {};

  for (const field of fields) {
    if (!String(payload[field] || "").trim()) {
      errors[field] = "This field is required.";
    }
  }

  return errors;
}

function buildReport(asset, period) {
  const normalizedAsset = String(asset).trim();
  const normalizedPeriod = String(period).trim();
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return {
    id: `REP-${Date.now()}`,
    title: `${normalizedPeriod} portfolio report for ${normalizedAsset}`,
    status: "Ready for review",
    summary:
      "Cash collection remains ahead of plan, one covenant requires monitoring, and leasing momentum improved across the office mix.",
    focus:
      "Recommend reviewing the insurance renewal timeline and one debt service covenant before stakeholder sign-off.",
    generatedAt: timestamp
  };
}

function buildComplianceScan() {
  state.scans += 1;

  return {
    runId: `SCAN-${state.scans}`,
    generatedAt: new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    }),
    checks: [
      {
        label: "Debt service covenant",
        status: "Monitor",
        detail: "Coverage ratio is inside threshold with only 0.12 headroom."
      },
      {
        label: "Insurance renewal",
        status: "Pass",
        detail: "Carrier documents are uploaded and current through Q4."
      },
      {
        label: "ESG reporting pack",
        status: "Pass",
        detail: "Energy disclosures and tenant engagement data are complete."
      }
    ]
  };
}

function buildMetrics() {
  state.metricRefreshes += 1;

  return {
    assets: metricBase.assets,
    properties: String(168 + state.metricRefreshes),
    occupancy: `${(97.4 + state.metricRefreshes * 0.1).toFixed(1)}%`,
    activeRisks: state.metricRefreshes % 2 === 0 ? "3" : "2"
  };
}

async function handleApiRequest(request, response, pathname) {
  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, { status: "ok", port: PORT });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/portfolio-summary") {
    sendJson(response, 200, buildMetrics());
    return true;
  }

  if (request.method === "POST" && pathname === "/api/report-drafts") {
    const payload = await parseRequestBody(request);
    const errors = validateRequiredFields(payload, ["asset", "period"]);

    if (Object.keys(errors).length) {
      sendJson(response, 400, { message: "Invalid report request.", errors });
      return true;
    }

    const report = buildReport(payload.asset, payload.period);
    state.reports.push(report);
    sendJson(response, 201, report);
    return true;
  }

  if (request.method === "POST" && pathname === "/api/compliance-scan") {
    sendJson(response, 200, buildComplianceScan());
    return true;
  }

  if (request.method === "POST" && pathname === "/api/demo-bookings") {
    const payload = await parseRequestBody(request);
    const errors = validateRequiredFields(payload, [
      "fullName",
      "workEmail",
      "company",
      "preferredDate",
      "teamSize"
    ]);

    if (!errors.workEmail && !isValidEmail(payload.workEmail)) {
      errors.workEmail = "Enter a valid work email.";
    }

    if (Object.keys(errors).length) {
      sendJson(response, 400, { message: "Invalid booking request.", errors });
      return true;
    }

    const booking = {
      id: `BOOK-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };

    state.bookings.push(booking);
    sendJson(response, 201, {
      confirmation:
        "Local demo booked. A portfolio walkthrough slot has been reserved.",
      booking
    });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/contact-requests") {
    const payload = await parseRequestBody(request);
    const errors = validateRequiredFields(payload, [
      "name",
      "email",
      "company",
      "message"
    ]);

    if (!errors.email && !isValidEmail(payload.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length) {
      sendJson(response, 400, { message: "Invalid contact request.", errors });
      return true;
    }

    const contact = {
      id: `CONTACT-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };

    state.contacts.push(contact);
    sendJson(response, 201, {
      confirmation:
        "Request received. The local demo workspace is ready for review.",
      contact
    });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/login-preview") {
    const payload = await parseRequestBody(request);

    if (
      payload.email === "analyst@agenticai.local" &&
      payload.password === "Demo123!"
    ) {
      sendJson(response, 200, {
        message: "Local analyst workspace unlocked."
      });
      return true;
    }

    sendJson(response, 401, {
      message: "Invalid local preview credentials."
    });
    return true;
  }

  return false;
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url, `http://${request.headers.host}`);
    const pathname = requestUrl.pathname;

    if (pathname.startsWith("/api/")) {
      const handled = await handleApiRequest(request, response, pathname);

      if (!handled) {
        sendJson(response, 404, { message: "API route not found." });
      }

      return;
    }

    const filePath = getStaticFilePath(pathname);

    if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      sendText(response, 404, "Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });

    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, 500, {
      message: "Unexpected server error.",
      detail: error.message
    });
  }
});

server.listen(PORT, () => {
  console.log(`Agentic AI Demo running at http://127.0.0.1:${PORT}`);
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
