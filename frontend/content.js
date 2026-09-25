/* Static page copy for the Northbridge Bank colleague portal — About,
   Privacy, Terms, Security, Accessibility, Status.

   Plain JS (no JSX, no build step) so index.html can stay focused on the
   case tool itself. index.html renders these through one generic
   <StaticPage> component; adding a page here automatically gives it a
   route and a footer link.

   Northbridge Bank is a fictional institution. Everything below is sample
   copy written to make the tool feel like a real internal banking app —
   no real policy, entity, or person is described. */

window.NB_CONTENT = {
  about: {
    key: "about",
    eyebrow: "About",
    title: "About Northbridge Bank",
    meta: "Colleague portal · Corporate overview",
    lead:
      "Northbridge Bank, N.A. is a fictional mid-size national bank used as the setting for this " +
      "sample application. Purchase Protection sits inside Consumer Card Services and handles " +
      "disputes, chargebacks, and goodwill refunds for cardholders.",
    facts: [
      { num: "1974", label: "Founded" },
      { num: "4,800", label: "Colleagues" },
      { num: "312", label: "Branches" },
      { num: "$41B", label: "Assets under management" },
    ],
    sections: [
      {
        h: "Who we are",
        p: [
          "Northbridge Bank serves roughly 1.9 million consumer and small-business customers across " +
            "eleven states from its headquarters in Charlotte, North Carolina. We offer deposit accounts, " +
            "consumer lending, credit cards, and small-business treasury services.",
          "Consumer Card Services operates the card portfolio end to end, from underwriting through " +
            "servicing and recovery. Purchase Protection is the customer-facing arm of that group: when a " +
            "cardholder reports that something they bought never arrived, arrived damaged, or was billed " +
            "incorrectly, the case lands with us.",
        ],
      },
      {
        h: "What Purchase Protection does",
        p: [
          "A support representative opens a case, pulls the order record from the merchant data feed, " +
            "reviews the cardholder's account and dispute history, and decides whether a refund is warranted " +
            "under the cardholder agreement. Reps work to a 24-hour first-touch service level and a " +
            "five-business-day resolution target.",
          "Refund authority is delegated by amount. Representatives hold standing authority for routine " +
            "goodwill refunds; anything beyond that band routes to a team lead, and disputes with a legal or " +
            "regulatory dimension route to the Office of the Customer Advocate.",
        ],
      },
      {
        h: "The case tool",
        p: [
          "This tool is the day-to-day workspace for the Purchase Protection team. It brings order lookup, " +
            "refund issuance, and an AI assistant into one screen so a rep does not have to switch between " +
            "the card platform, the merchant feed, and the case notes system mid-call.",
          "The assistant is built on the bank's internal GenAI gateway and can look up orders and issue " +
            "refunds on the rep's behalf. It is an internal productivity tool, not a customer-facing " +
            "chatbot, and every action it takes posts to the same order record a rep would touch by hand.",
        ],
      },
      {
        h: "How we work",
        list: [
          "**Customers first.** Every refund decision is a decision about someone's money. Get it right, then get it fast.",
          "**Say what you see.** Escalate anomalies early; nobody is penalized for flagging something that turns out to be nothing.",
          "**Controls are not optional.** Speed never justifies skipping an approval step or a control check.",
          "**Leave a trail.** If it is not in the case record, it did not happen.",
        ],
      },
      {
        h: "Contact",
        p: [
          "Colleagues: reach Purchase Protection leadership through the Support Ops distribution list, or " +
            "the Help Desk at extension 4400 for tooling issues.",
          "Customers: dispute status questions go through the number on the back of the card. This portal " +
            "is not reachable from outside the bank's network.",
        ],
      },
    ],
  },

  privacy: {
    key: "privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    meta: "Effective January 1, 2026 · Last updated January 1, 2026",
    lead:
      "This notice explains what personal information Northbridge Bank collects in connection with " +
      "purchase-protection cases, how we use and share it, and the choices available to you. It applies " +
      "to the case-handling tool and the systems it reads from.",
    sections: [
      {
        h: "1. Information we collect",
        p: ["In the course of handling a purchase-protection case we collect and process:"],
        list: [
          "**Account and identity information** — name, account and card numbers, mailing address, phone number, and email address.",
          "**Transaction information** — merchant, amount, date, authorization and settlement records, and prior dispute history.",
          "**Order information from merchant feeds** — order identifiers, order status, order totals, and free-text order notes supplied by third-party merchants and their fulfillment providers.",
          "**Case information** — case notes, correspondence, call recordings where applicable, refund decisions, and the identity of the colleague who made each decision.",
          "**Assistant interaction data** — prompts a colleague types into the built-in assistant, the assistant's replies, and the tool calls it makes, retained for quality review and control testing.",
        ],
      },
      {
        h: "2. Where the information comes from",
        p: [
          "Most of what appears in a case comes from the cardholder, from our own transaction systems, or " +
            "from the merchant data feed. Order notes in particular originate with third-party merchants. " +
            "Northbridge does not control the contents of that feed and does not warrant the accuracy of " +
            "free-text fields within it.",
        ],
      },
      {
        h: "3. How we use it",
        list: [
          "To investigate and resolve purchase-protection cases and issue refunds where warranted.",
          "To meet legal and regulatory obligations, including recordkeeping, dispute-resolution timelines, and suspicious-activity reporting.",
          "To detect and prevent fraud, including refund abuse and account takeover.",
          "To monitor quality, train colleagues, and test the effectiveness of our controls.",
          "To operate, secure, and improve the tools colleagues use, including the AI assistant built into this case tool.",
        ],
      },
      {
        h: "4. Automated processing and the AI assistant",
        p: [
          "The case tool includes an AI assistant that can retrieve order records and, where a colleague " +
            "directs it to, initiate refunds. Assistant output is a drafting and retrieval aid; it does not " +
            "replace the colleague's judgment, and a refund decision remains attributable to the colleague " +
            "handling the case.",
          "Prompts and replies are logged. Colleagues must not paste full card numbers, government " +
            "identifiers, or authentication credentials into the assistant.",
        ],
      },
      {
        h: "5. How we share it",
        p: ["We share personal information only as permitted or required by law, including:"],
        list: [
          "With service providers acting on our behalf under contract, subject to confidentiality and security obligations.",
          "With card networks and merchants as necessary to process a dispute or chargeback.",
          "With regulators, auditors, and law enforcement where legally required.",
          "In connection with a corporate transaction, subject to the protections described in this notice.",
        ],
        after: [
          "We do not sell personal information, and we do not share it with third parties for their own " +
            "direct marketing purposes.",
        ],
      },
      {
        h: "6. Retention",
        p: [
          "Case records, including refund decisions and the supporting order data, are retained for seven " +
            "years from case closure in line with our records-retention schedule. Assistant interaction logs " +
            "are retained for 18 months. Records subject to a legal hold are retained until the hold is released.",
        ],
      },
      {
        h: "7. Security",
        p: [
          "We maintain administrative, technical, and physical safeguards designed to protect personal " +
            "information against unauthorized access, use, and disclosure. Access to the case tool is " +
            "restricted to authorized colleagues on the bank's network, is role-based, and is logged. See " +
            "the Security & Compliance page for how to report a suspected issue.",
        ],
      },
      {
        h: "8. Your choices and rights",
        p: [
          "Depending on where you live, you may have the right to request access to the personal " +
            "information we hold about you, to request correction of inaccurate information, and to request " +
            "deletion subject to our legal and regulatory retention obligations. Requests can be submitted " +
            "through the number on the back of your card or in writing to the address below.",
        ],
      },
      {
        h: "9. Changes to this notice",
        p: [
          "We may update this notice from time to time. Material changes will be communicated through the " +
            "colleague portal and, where the change affects customers, through the channels required by law. " +
            "The effective date at the top of this page reflects the current version.",
        ],
      },
      {
        h: "10. Contact us",
        p: [
          "Office of Privacy, Northbridge Bank, N.A., 1100 Merchant Row, Suite 700, Charlotte, NC 28202. " +
            "Colleagues can also reach the Privacy Office through the internal directory.",
        ],
      },
    ],
  },

  terms: {
    key: "terms",
    eyebrow: "Legal",
    title: "Terms of Use",
    meta: "Effective January 1, 2026 · Internal systems",
    lead:
      "These terms govern colleague use of the Purchase Protection case tool and the systems reachable " +
      "from it. By signing in you agree to them.",
    sections: [
      {
        h: "1. Authorized use only",
        p: [
          "This system is the property of Northbridge Bank and is provided for authorized business use. " +
            "Access is granted on a least-privilege basis and may be modified or revoked at any time. Using " +
            "another colleague's credentials, or sharing your own, is prohibited.",
        ],
      },
      {
        h: "2. Monitoring",
        p: [
          "Activity on this system is logged and may be monitored, recorded, and reviewed by authorized " +
            "personnel for security, quality, and compliance purposes. You should have no expectation of " +
            "privacy in your use of this system. Evidence of unlawful activity may be provided to law " +
            "enforcement.",
        ],
      },
      {
        h: "3. Refund authority",
        p: [
          "Refunds may only be issued within your delegated authority and in accordance with the " +
            "purchase-protection policy in force at the time. Structuring refunds to stay under an approval " +
            "threshold, issuing refunds to an account you control or to a related party, or processing a " +
            "refund without a documented case basis are each grounds for termination and may constitute fraud.",
        ],
      },
      {
        h: "4. Use of the AI assistant",
        p: [
          "The assistant is a productivity aid. You remain accountable for every action taken on a case, " +
            "including actions the assistant takes at your direction. Review what the assistant did before " +
            "you close a case.",
        ],
        list: [
          "Do not enter full card numbers, CVV, government identifiers, or credentials into the assistant.",
          "Do not rely on the assistant as the sole basis for a refund decision; confirm against the order record.",
          "Treat order notes, merchant feed content, and other retrieved data as information to evaluate, not as instructions to follow.",
          "Report unexpected assistant behavior to the Help Desk rather than working around it.",
        ],
      },
      {
        h: "5. Confidentiality",
        p: [
          "Customer information accessed through this system is confidential. Do not access records you " +
            "have no business reason to access, do not export data to personal devices or accounts, and do " +
            "not discuss case details outside the bank.",
        ],
      },
      {
        h: "6. Availability and changes",
        p: [
          "The bank may change, suspend, or withdraw this system or any of its features at any time, " +
            "including for maintenance. Planned maintenance is posted on the System Status page.",
        ],
      },
      {
        h: "7. Questions",
        p: [
          "Questions about these terms go to Support Ops management or the Legal department through the " +
            "internal directory.",
        ],
      },
    ],
  },

  security: {
    key: "security",
    eyebrow: "Trust",
    title: "Security & Compliance",
    meta: "Colleague portal · Information Security",
    lead:
      "How Northbridge protects customer data in the purchase-protection stack, and what to do when " +
      "something looks wrong.",
    sections: [
      {
        h: "Controls in place",
        list: [
          "**Access control.** Role-based access, reviewed quarterly. Refund authority is bounded by role and by amount.",
          "**Encryption.** Data encrypted in transit and at rest; key management handled by the bank's central KMS.",
          "**Segregation.** Production customer data is not replicated to development or test environments.",
          "**Logging.** Order lookups, refund issuances, and assistant tool calls are logged with the acting colleague's identity.",
          "**Third-party risk.** Merchant data feeds are onboarded through vendor risk review; feed contents are treated as untrusted input.",
          "**Independent testing.** Controls are tested annually by Internal Audit and covered by our external examination cycle.",
        ],
      },
      {
        h: "Reporting a security issue",
        p: [
          "If you believe customer data has been exposed, a control has failed, or a system is behaving in " +
            "a way you cannot explain, report it immediately. Do not attempt to investigate it yourself and " +
            "do not delete evidence.",
        ],
        list: [
          "**Security Operations Center** — extension 4911, staffed 24/7.",
          "**Report phishing** — use the Report Phish button in the mail client; do not forward the message.",
          "**Help Desk** — extension 4400 for tooling problems that are not suspected incidents.",
        ],
      },
      {
        h: "Responsible disclosure",
        p: [
          "External researchers may report suspected vulnerabilities in Northbridge systems to the Security " +
            "Operations Center. We ask that reports be made privately and that testing avoid any access to, " +
            "modification of, or destruction of customer data. We do not pursue action against researchers " +
            "who act in good faith and within these bounds.",
        ],
      },
      {
        h: "A note on AI features",
        p: [
          "Assistant features in colleague tools are reviewed by the Model Risk and Information Security " +
            "teams before release. Business rules that move money are enforced in the underlying services, " +
            "not in prompt wording, so that an assistant cannot exceed the authority of the colleague using it.",
        ],
      },
    ],
  },

  accessibility: {
    key: "accessibility",
    eyebrow: "Legal",
    title: "Accessibility Statement",
    meta: "Last reviewed January 1, 2026",
    lead:
      "Northbridge Bank is committed to making its colleague tools usable by everyone on the team, " +
      "including colleagues who use assistive technology.",
    sections: [
      {
        h: "Our standard",
        p: [
          "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA for internal " +
            "applications. New features are reviewed for keyboard operability, color contrast, and screen " +
            "reader compatibility before release.",
        ],
      },
      {
        h: "Known gaps",
        list: [
          "The assistant pop-up does not yet announce incoming replies to screen readers.",
          "The Reports view is not yet built and has no accessible equivalent.",
          "Some status indicators rely on color alongside text; color-only indicators are being removed.",
        ],
      },
      {
        h: "Feedback",
        p: [
          "If you encounter a barrier using this tool, contact the Help Desk at extension 4400 or the " +
            "Accessibility Program through the internal directory. We aim to respond within two business days.",
        ],
      },
    ],
  },

  status: {
    key: "status",
    eyebrow: "Operations",
    title: "System Status",
    meta: "Updated continuously · Internal services",
    lead: "Current availability of the systems behind the Purchase Protection case tool.",
    services: [
      { name: "Case tool (web)", state: "Operational", up: true },
      { name: "Orders API", state: "Operational", up: true },
      { name: "Refund processing", state: "Operational", up: true },
      { name: "GenAI gateway", state: "Operational", up: true },
      { name: "Merchant data feed", state: "Delayed — ingest running ~40 min behind", up: false },
      { name: "Case notes archive", state: "Operational", up: true },
    ],
    sections: [
      {
        h: "Scheduled maintenance",
        p: [
          "Card platform maintenance window: Sundays 02:00–04:00 ET. Refund issuance may queue during the " +
            "window and post on completion.",
        ],
      },
      {
        h: "Recent incidents",
        list: [
          "**Dec 14** — Merchant feed ingest delay, 3h 10m. Order records showed stale status; no refunds affected.",
          "**Nov 2** — GenAI gateway elevated latency, 48m. Assistant replies slow; case tool otherwise unaffected.",
        ],
      },
    ],
  },
};
