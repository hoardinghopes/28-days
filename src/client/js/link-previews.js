/* eslint-disable camelcase, func-names, no-unused-vars, no-global-assign */
/* eslint-env browser */
/* global tooltipContentHtml */

function init() {
  let opacityTimeout;
  let contentTimeout;
  const transitionDurationMs = 100;

  const iframe = document.getElementById("link-preview-iframe");
  const tooltipWrapper = document.getElementById("tooltip-wrapper");
  const tooltipContent = document.getElementById("tooltip-content");

  function hideTooltip() {
    opacityTimeout = setTimeout(function () {
      tooltipWrapper.style.opacity = 0;
      contentTimeout = setTimeout(function () {
        tooltipContent.innerHTML = "";
        tooltipWrapper.style.display = "none";
      }, transitionDurationMs + 1);
    }, transitionDurationMs);
  }

  function showTooltip(event) {
    const elem = event.target;
    const elem_props = elem.getClientRects()[elem.getClientRects().length - 1];
    const top = window.pageYOffset || document.documentElement.scrollTop;

    if (event.target.host === window.location.host) {
      iframe.src = event.target.href;
      iframe.onload = function () {
        tooltipContentHtml = "";
        tooltipContentHtml += `<div style="font-weight: bold;">${
          iframe.contentWindow.document.querySelector("h1").innerHTML
        }</div>`;
        tooltipContentHtml +=
          iframe.contentWindow.document.querySelector("#content").innerHTML;

        tooltipContent.innerHTML = tooltipContentHtml;

        tooltipWrapper.style.display = "block";
        setTimeout(function () {
          tooltipWrapper.style.opacity = 1;
        }, 1);
      };

      tooltipWrapper.style.left = `${
        elem_props.left - tooltipWrapper.offsetWidth / 2 + elem_props.width / 2
      }px`;
      if (window.innerHeight - elem_props.top < tooltipWrapper.offsetHeight) {
        tooltipWrapper.style.top = `${
          elem_props.top + top - tooltipWrapper.offsetHeight - 10
        }px`;
      } else if (
        window.innerHeight - elem_props.top >
        tooltipWrapper.offsetHeight
      ) {
        tooltipWrapper.style.top = `${elem_props.top + top + 35}px`;
      }

      if (
        elem_props.left + elem_props.width / 2 <
        tooltipWrapper.offsetWidth / 2
      ) {
        tooltipWrapper.style.left = "10px";
      } else if (
        document.body.clientWidth - elem_props.left - elem_props.width / 2 <
        tooltipWrapper.offsetWidth / 2
      ) {
        tooltipWrapper.style.left = `${
          document.body.clientWidth - tooltipWrapper.offsetWidth - 20
        }px`;
      }
    }
  }

  function setupListeners(linkElement) {
    linkElement.addEventListener("mouseleave", function (_event) {
      hideTooltip();
    });

    tooltipWrapper.addEventListener("mouseleave", function (_event) {
      hideTooltip();
    });

    linkElement.addEventListener("mouseenter", function (event) {
      clearTimeout(opacityTimeout);
      clearTimeout(contentTimeout);
      showTooltip(event);
    });

    tooltipWrapper.addEventListener("mouseenter", function (event) {
      clearTimeout(opacityTimeout);
      clearTimeout(contentTimeout);
    });
  }

  document.querySelectorAll("#notes-entry-container a").forEach(setupListeners);
}

module.exports = init;
