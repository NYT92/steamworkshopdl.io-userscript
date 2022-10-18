// ==UserScript==
// @name           Steamwkdl.io Button
// @namespace      https://nsdev.ml
// @description    Adds a button to the Steam Workshop pages that lets you head straight to the specific addon page at steamworkshopdownload.io (INSPIRED BY steamworkshop.download usscript)
// @include        *steamcommunity.com/sharedfiles/filedetails/?id=*
// @version        1.0.0
// @downloadURL    https://cdn.statically.io/gh/NYT92/steamworkshopdl.io-userscript/main/steamwshp.user.js
// @updateURL      https://cdn.statically.io/gh/NYT92/steamworkshopdl.io-userscript/main/steamwshp.user.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

"use strict";

const postFileID =
  "https://db.steamworkshopdownloader.io/prod/api/details/file";
var patt = new RegExp("[0-9]{2,15}");
var id = patt.exec(document.URL);

try {
  GM_xmlhttpRequest({
    method: "POST",
    url: postFileID,
    data: `[${id}]`,
    responseType: "json",
    onprogress: function () {
      console.log("FETCHING FILE URL...");
    },
    onload: function (response) {
      var data = JSON.parse(response.responseText);
      if (data[0].file_url === "") {
        const realButton = document.getElementById("SubscribeItemBtn");
        const textinfo = document.createElement("div");
        textinfo.innerHTML = `
                    <span class="subscribeText">
                    <div class="subscribeOption subscribe selected" id="SubscribeItemOptionAdd">Require to own a game or software</div>
                    </span>`;
        if (realButton.nextSibling) {
          realButton.parentNode.insertBefore(textinfo, realButton.nextSibling);
        } else {
          realButton.parentNode.appendChild(textinfo);
        }
      } else {
        const realButton = document.getElementById("SubscribeItemBtn");
        const myButtonPosition = realButton.offsetWidth + 20;
        const button = document.createElement("a");
        button.setAttribute(
          "class",
          "btn_green_white_innerfade btn_border_2px btn_medium"
        );
        button.setAttribute("href", data[0].file_url);
        button.setAttribute("style", "right: " + myButtonPosition + "px;");
        button.innerHTML = `
                <div class="subscribeIcon" style="background-position: 0px -58px; left: 405px; top: 61px;">
                </div>
                   <span class="subscribeText">
                    <div class="subscribeOption subscribe selected" id="SubscribeItemOptionAdd">Download</div>
                    </span>`;
        if (realButton.nextSibling) {
          realButton.parentNode.insertBefore(button, realButton.nextSibling);
        } else {
          realButton.parentNode.appendChild(button);
        }
      }
    },
    onerror: function (e) {
      alert(
        "There is a problem with the steamworkshopdownloader please try again later!"
      );
    },
  });
} catch (e) {
  return "Error" + e.message;
}
