const FORMSPREE_ENDPOINT =
  process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mzdaogwo";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  message: 1500,
};

const ALLOWED_INTERESTS = new Set(["waitlist", "partners"]);
const ALLOWED_GOALS = {
  waitlist: new Set(["break-in", "level-up", "higher-pay", "build-own"]),
  partners: new Set(["upskill", "retention", "leadership", "culture"]),
};

const INTEREST_LABELS = {
  waitlist: "Join the Performance Workshop waitlist",
  partners: "Explore an Enterprise Partnership",
};

const GOAL_LABELS = {
  "break-in": "Break into AI / tech from another field",
  "level-up": "Level up and get promoted in my current role",
  "higher-pay": "Transition to a significantly higher-paying career",
  "build-own": "Build my own AI-powered project or business",
  upskill: "Upskill our team on AI tools and workflows",
  retention: "Improve talent retention through learning investment",
  leadership: "Prepare leadership for AI-driven disruption",
  culture: "Build a culture of continuous, high-performance learning",
};

const submissionsByIp = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

function json(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function normalizeBody(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

function validate(payload) {
  const errors = {};
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const interest = String(payload.interest || "").trim();
  const goal = String(payload.goal || "").trim();
  const message = String(payload.message || "").trim();

  if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > FIELD_LIMITS.email) {
    errors.email = `Email must be ${FIELD_LIMITS.email} characters or fewer.`;
  }

  if (!ALLOWED_INTERESTS.has(interest)) {
    errors.interest = "Please select a valid interest.";
  }

  if (!ALLOWED_GOALS[interest]?.has(goal)) {
    errors.goal = "Please select an option.";
  }

  if (message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  return {
    errors,
    values: { name, email, interest, goal, message },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  const payload = normalizeBody(req.body);

  if (payload.website) {
    return json(res, 200, { ok: true });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json(res, 429, { error: "Too many submissions" });
  }

  const { errors, values } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return json(res, 400, { errors });
  }

  try {
    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        interest: INTEREST_LABELS[values.interest],
        goal: GOAL_LABELS[values.goal],
        message: values.message,
      }),
    });

    if (!formspreeRes.ok) {
      return json(res, 502, { error: "Form service unavailable" });
    }

    return json(res, 200, { ok: true });
  } catch {
    return json(res, 502, { error: "Form service unavailable" });
  }
}
