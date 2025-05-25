require(["jquery"], function ($) {
    $(window).on("load", function () {
      if (["page-user-editadvanced", "page-user-edit"].includes($("body").attr("id"))) {
        M.util.js_pending("theme_boost/loader");
        require(["theme_boost/loader"], function () {
          M.util.js_complete("theme_boost/loader");
        });
  

        require(['theme_adaptable/init'], (module) => module.init());
        require(['theme_adaptable/validateRegistration'], (module) => module.validate());
      }
    });
  });
  