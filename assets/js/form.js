(function () {
  async function postForm(url, formEl, statusEl, submitBtn) {
    statusEl.textContent = "";
    const fd = new FormData(formEl);

    // Disable button
    const oldText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      const res = await fetch(url, { method: "POST", body: fd });
      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        statusEl.style.color = "red";
        statusEl.textContent = "Server did not return JSON: " + text.slice(0, 200);
        return;
      }

      if (data.ok) {
        statusEl.style.color = "green";
        statusEl.textContent = data.message || "Sent!";
        formEl.reset();
      } else {
        statusEl.style.color = "red";
        statusEl.textContent = data.message || "Failed!";
      }
    } catch (err) {
      statusEl.style.color = "red";
      statusEl.textContent = "Network/server error.";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = oldText || "Submit";
      }
    }
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const statusEl = document.getElementById("contactStatus") || document.createElement("div");
    const btn = contactForm.querySelector('button[type="submit"]');
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      postForm("api/contact_send.php", contactForm, statusEl, btn);
    });
  }

  // CAREER FORM
  const careerForm = document.getElementById("careerForm");
  if (careerForm) {
    const statusEl = document.getElementById("careerStatus") || document.createElement("div");
    const btn = careerForm.querySelector('button[type="submit"]');
    careerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      postForm("api/career_send.php", careerForm, statusEl, btn);
    });
  }
})();