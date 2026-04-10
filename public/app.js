const toast = document.querySelector("[data-testid='global-toast']");
const activityFeed = document.querySelector("[data-testid='activity-feed']");
const reportResult = document.querySelector("[data-testid='report-result']");
const complianceResults = document.querySelector("[data-testid='compliance-results']");
const apiHealthResult = document.querySelector("[data-testid='api-health-result']");
const contactFeedback = document.querySelector("[data-testid='contact-feedback']");
const loginResult = document.querySelector("[data-testid='login-result']");
const loginFeedback = document.querySelector("[data-testid='login-feedback']");

const metricElements = {
  assets: document.querySelector("[data-testid='metric-assets']"),
  properties: document.querySelector("[data-testid='metric-properties']"),
  occupancy: document.querySelector("[data-testid='metric-occupancy']"),
  risks: document.querySelector("[data-testid='metric-risks']")
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function prependActivity(message) {
  const item = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });

  item.innerHTML = `<strong>${timestamp}</strong> ${message}`;

  if (activityFeed.children.length === 1 && activityFeed.textContent.includes("No actions")) {
    activityFeed.innerHTML = "";
  }

  activityFeed.prepend(item);
}

function clearFieldErrors(form) {
  form.querySelectorAll(".field-error").forEach((element) => {
    element.textContent = "";
  });
}

function setFieldErrors(form, errors) {
  clearFieldErrors(form);

  Object.entries(errors).forEach(([fieldName, message]) => {
    const target = form.querySelector(`[data-error-for='${fieldName}']`);

    if (target) {
      target.textContent = message;
    }
  });
}

function serializeForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    return;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.style.overflow = "";
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.message || "Unexpected request error.");
    error.payload = payload;
    throw error;
  }

  return payload;
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.openModal));
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", () => {
    const modal = element.closest(".modal");

    if (modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  document.querySelectorAll(".modal").forEach((modal) => {
    if (!modal.hidden) {
      closeModal(modal);
    }
  });
});

document.getElementById("jump-to-reporting").addEventListener("click", () => {
  document.getElementById("reporting-card").scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("[data-testid='generate-report-button']").focus();
});

document.getElementById("jump-to-compliance").addEventListener("click", () => {
  document.getElementById("compliance-card").scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("[data-testid='run-compliance-scan']").focus();
});

document.getElementById("hero-generate-report").addEventListener("click", () => {
  document.getElementById("reporting-card").scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("[data-testid='generate-report-button']").click();
});

document.getElementById("hero-run-scan").addEventListener("click", () => {
  document.getElementById("compliance-card").scrollIntoView({ behavior: "smooth", block: "center" });
  document.querySelector("[data-testid='run-compliance-scan']").click();
});

document.getElementById("refresh-metrics").addEventListener("click", async () => {
  const metrics = await requestJson("/api/portfolio-summary");

  metricElements.assets.textContent = metrics.assets;
  metricElements.properties.textContent = metrics.properties;
  metricElements.occupancy.textContent = metrics.occupancy;
  metricElements.risks.textContent = metrics.activeRisks;

  showToast("Portfolio metrics refreshed.");
  prependActivity("Portfolio KPI band refreshed.");
});

document.getElementById("report-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Generating...";

  try {
    const payload = serializeForm(form);
    const report = await requestJson("/api/report-drafts", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    reportResult.innerHTML = `
      <div class="report-result">
        <div class="report-result__meta">
          <span class="report-result__badge">${report.status}</span>
          <span>${report.generatedAt}</span>
        </div>
        <h4>${report.title}</h4>
        <p>${report.summary}</p>
        <p><strong>Focus:</strong> ${report.focus}</p>
      </div>
    `;

    showToast("Report draft created.");
    prependActivity(`Drafted report for <strong>${payload.asset}</strong>.`);
  } catch (error) {
    reportResult.innerHTML = `<p class="inline-feedback">${error.message}</p>`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Generate report draft";
  }
});

document.getElementById("run-compliance-scan").addEventListener("click", async () => {
  const scan = await requestJson("/api/compliance-scan", { method: "POST" });

  complianceResults.innerHTML = scan.checks
    .map(
      (check) => `
        <li class="scan-list__item">
          <div class="scan-list__row">
            <strong>${check.label}</strong>
            <span class="scan-list__status scan-list__status--${check.status.toLowerCase()}">${check.status}</span>
          </div>
          <p class="scan-list__detail">${check.detail}</p>
        </li>
      `
    )
    .join("");

  showToast("Compliance scan completed.");
  prependActivity("Completed a compliance scan with one monitor item.");
});

document.getElementById("check-api-health").addEventListener("click", async () => {
  try {
    const health = await requestJson("/api/health");
    const checkedAt = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });

    apiHealthResult.innerHTML = `
      <div class="health-result">
        <div class="health-result__meta">
          <span class="report-result__badge">Healthy</span>
          <span>Checked ${checkedAt}</span>
        </div>
        <p><strong>Status:</strong> ${health.status}</p>
        <p><strong>Port:</strong> ${health.port}</p>
      </div>
    `;

    showToast("Local API is healthy.");
    prependActivity(`Verified local API health on port <strong>${health.port}</strong>.`);
  } catch (error) {
    apiHealthResult.innerHTML = `<p class="inline-feedback">${error.message}</p>`;
  }
});

document.getElementById("contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = serializeForm(form);
  const errors = {};

  if (!payload.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!payload.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(payload.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!payload.company?.trim()) {
    errors.company = "Company is required.";
  }

  if (!payload.message?.trim()) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length) {
    setFieldErrors(form, errors);
    contactFeedback.textContent = "Please correct the highlighted fields.";
    return;
  }

  clearFieldErrors(form);

  try {
    const result = await requestJson("/api/contact-requests", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    form.reset();
    contactFeedback.textContent = result.confirmation;
    showToast("Access request submitted.");
    prependActivity(`Submitted access request for <strong>${result.contact.company}</strong>.`);
  } catch (error) {
    setFieldErrors(form, error.payload?.errors || {});
    contactFeedback.textContent = error.message;
  }
});

document.getElementById("booking-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = serializeForm(form);
  const errors = {};

  ["fullName", "workEmail", "company", "preferredDate", "teamSize"].forEach((field) => {
    if (!payload[field]?.trim()) {
      errors[field] = "This field is required.";
    }
  });

  if (!errors.workEmail && !isValidEmail(payload.workEmail)) {
    errors.workEmail = "Enter a valid work email.";
  }

  if (Object.keys(errors).length) {
    setFieldErrors(form, errors);
    return;
  }

  clearFieldErrors(form);

  try {
    const result = await requestJson("/api/demo-bookings", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    form.reset();
    closeModal(document.getElementById("booking-modal"));
    showToast(result.confirmation);
    prependActivity(`Reserved demo slot for <strong>${result.booking.company}</strong>.`);
  } catch (error) {
    setFieldErrors(form, error.payload?.errors || {});
  }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  try {
    const result = await requestJson("/api/login-preview", {
      method: "POST",
      body: JSON.stringify(serializeForm(form))
    });

    loginFeedback.textContent = result.message;
    loginResult.innerHTML = `<p>${result.message}</p>`;
    showToast("Preview login successful.");
    prependActivity("Unlocked the analyst workspace preview.");
    form.reset();
    closeModal(document.getElementById("login-modal"));
  } catch (error) {
    loginFeedback.textContent = error.message;
    loginResult.innerHTML = `<p>${error.message}</p>`;
  }
});
